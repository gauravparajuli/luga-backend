import Cart from '../models/Cart.js'

// GET REQUESTED CART        GET
export const getCart = async (req, res, next) => {
    const userId = req.params.id
    try {
        const cart = await Cart.findOne({ userId })
        res.status(200).json(cart)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// GET ALL CARTS         GET
export const getAllCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        next(error)
    }
}

// UPDATE A CART         UPDATE
export const updateCart = async (req, res, next) => {
    const userId = req.params.id
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
