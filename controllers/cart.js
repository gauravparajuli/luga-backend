const Cart = require('../models/Cart.js')

// GET REQUESTED CART        GET
exports.getCart = async (req, res, next) => {
    const userId = req.user.id
    try {
        const cart = await Cart.findOne({ userId })
        res.status(200).json(cart)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// GET ALL CARTS         GET
exports.getAllCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        next(error)
    }
}

// UPDATE A CART         UPDATE
exports.updateCart = async (req, res, next) => {
    const userId = req.user.id
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $set: req.body },
            { new: true, upsert: true }
        )
        res.status(200).send(updatedCart)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}
