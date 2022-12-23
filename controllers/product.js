import Product from '../models/Product.js'

// GET REQUESTED PRODUCT        GET
export const getProduct = async (req, res, next) => {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// GET ALL PRODUCTS         GET
export const getAllProducts = async (req, res, next) => {
    const qNew = req.query.new
    const qCategory = req.query.category

    let productList
    if (qNew) {
        productList = await Product.find().sort({ createdAt: -1 }).limit(5)
    } else if (qCategory) {
        productList = await Product.find({ categories: { $in: [qCategory] } })
    } else {
        productList = await Product.find()
    }
}

// ADD A PRODUCT           POST
export const addProduct = async (req, res, next) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        next(error)
    }
}

// UPDATE A PRODUCT         UPDATE
export const updateProduct = async (req, res, next) => {
    const productId = req.params.id
    try {
        const updatedProduct = await Product.findByIdandUpdate(
            productId,
            { $set: req.body },
            { new: true }
        )
        res.status(200).send(updatedProduct)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// DELETE A PRODUCT         DELETE
export const deleteProduct = async (req, res, next) => {
    const productId = req.params.id
    try {
        await Product.findByIdandDelete(productId)
        res.status(204).send()
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}
