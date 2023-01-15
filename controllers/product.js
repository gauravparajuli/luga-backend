const Product = require('../models/Product.js')
const { validateProduct } = require('../validators/product-validator')

const crypto = require('crypto')

// s3 client code
const {
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    S3Client,
} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const bucketName = process.env.BUCKET_NAME

// configuirng s3 bucket here
const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey,
    },
    region: bucketRegion,
})

// generate random image name for s3
const randomImageName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString('hex')

// delete image file from s3 by imageName
const deleteImageFile = async (imageName) => {
    const params = {
        Bucket: bucketName,
        Key: imageName,
    }
    const command = new DeleteObjectCommand(params)
    await s3.send(command)
}

// delete image file from s3 by productId
const deleteProductImageFile = async (productId) => {
    const product = await Product.findById(productId)
    if (product) {
        deleteImageFile(product.image)
    }
}
// generates image url for images in s3
const generateImageUrl = async (imageName) => {
    const getObjectParams = {
        Bucket: bucketName,
        Key: imageName,
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    return url
}

// GET REQUESTED PRODUCT        GET
exports.getProduct = async (req, res, next) => {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId)

        if (!product) {
            const error = new Error('product not found.')
            error.statusCode = 404
            throw error
        }

        product._doc.imageUrl = await generateImageUrl(product.image)

        res.status(200).json(product)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// GET ALL PRODUCTS         GET
exports.getAllProducts = async (req, res, next) => {
    const qNew = req.query.new
    const qCategory = req.query.category

    let productList
    try {
        if (qNew) {
            productList = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (qCategory) {
            console.log('is this running')
            productList = await Product.find({
                categories: { $in: [qCategory] },
            })
        } else {
            productList = await Product.find()
        }

        // add image url to every products
        for (let product of productList) {
            product._doc.imageUrl = await generateImageUrl(product.image)
        }
        res.status(200).json(productList)
    } catch (error) {
        next(error)
    }
}

// ADD A PRODUCT           POST
exports.addProduct = async (req, res, next) => {
    const { error } = validateProduct(req.body)

    try {
        if (error) {
            const err = new Error(`input validation failed.`)
            err.statusCode = 422
            err.details = error.details
            throw err
        }

        if (!req.file) {
            const err = new Error(`provide image for product.`)
            err.statusCode = 422
            throw err
        }

        const imageName = randomImageName()

        const params = {
            Key: imageName,
            Bucket: process.env.BUCKET_NAME,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params)
        await s3.send(command)

        const newProduct = new Product({ ...req.body, image: imageName })
        await newProduct.save()
        newProduct._doc.imageUrl = await generateImageUrl(newProduct.image) // add image url
        res.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }
}

// UPDATE A PRODUCT         UPDATE
exports.updateProduct = async (req, res, next) => {
    const productId = req.params.id
    const { error } = validateProduct(req.body)
    try {
        if (error) {
            const err = new Error(`input validation failed.`)
            err.statusCode = 422
            err.details = error.details
            throw err
        }

        let product
        if (!req.file) {
            // no image file was uploaded
            product = await Product.findByIdAndUpdate(
                productId,
                { $set: req.body },
                { new: true, upsert: false }
            )
            product._doc.imageUrl = await generateImageUrl(product.image)
        } else {
            // new image file was uploaded
            await deleteProductImageFile(productId) // delete the old image file from s3

            const imageName = randomImageName()

            const params = {
                Key: imageName,
                Bucket: process.env.BUCKET_NAME,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            }

            const command = new PutObjectCommand(params)
            await s3.send(command) // new image is uploaded to s3
            product = await Product.findByIdAndUpdate(
                productId,
                { $set: { ...req.body, image: imageName } },
                { new: true, upsert: false }
            )
            product._doc.imageUrl = await generateImageUrl(product.image)
        }

        res.status(200).send(product)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// DELETE A PRODUCT         DELETE
exports.deleteProduct = async (req, res, next) => {
    const productId = req.params.id
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId)
        if (deletedProduct) {
            await deleteImageFile(deletedProduct.image)
        }
        res.status(204).send()
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}
