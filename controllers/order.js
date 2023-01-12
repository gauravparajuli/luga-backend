import Order from '../models/Order.js'

// GET REQUESTED ORDER        GET
export const getCart = async (req, res, next) => {
    const userId = req.params.id
    try {
        const cart = await Cart.findOne({ userId })
        res.status(200).json(cart)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// GET ALL ORDER         GET
export const getAllCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        next(error)
    }
}

// UPDATE A ORDER         UPDATE
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

// GET MONTHLY INCOME       GET
export const getMontlyIncome = async (res, res, next) => {
    const Date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth - 1))
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: lastMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount',
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' },
                },
            },
        ])
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}
