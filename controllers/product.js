const Product = require('../models/Product.js')
const { validateProduct } = require('../validators/product-validator')

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
        console.log(productList)
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
        console.log(req.body)
        const newProduct = new Product(req.body)
        await newProduct.save()
        console.log(newProduct)
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
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: req.body },
            { new: true, upsert: false }
        )
        res.status(200).send(updatedProduct)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// DELETE A PRODUCT         DELETE
exports.deleteProduct = async (req, res, next) => {
    const productId = req.params.id
    try {
        await Product.findByIdAndDelete(productId)
        res.status(204).send()
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}
