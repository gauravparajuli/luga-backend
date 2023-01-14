const Cart = require('../models/Cart.js')
const { validateCartItems } = require('../validators/cart-validator')

// GET REQUESTED CART        GET
exports.getCart = async (req, res, next) => {
    const userId = req.user.id
    try {
        let cart
        cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = { userId, products: [] }
        }
        res.status(200).json(cart)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// UPDATE A CART         UPDATE
exports.updateCart = async (req, res, next) => {
    const userId = req.user.id
    const { error } = validateCartItems(req.body)
    try {
        if (error) {
            const err = new Error(`input validation failed.`)
            err.statusCode = 422
            err.details = error.details
            throw err
        }
        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $set: { userId, ...req.body } },
            { new: true, upsert: true }
        )
        res.status(200).json(updatedCart)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}
