const Order = require('../models/Order.js')
const Cart = require('../models/Cart')

exports.createMyOrder = async (req, res, next) => {
    const userId = req.user.id

    const cart = await Cart.findOne({ userId })
    if (!cart || cart.products.length === 0) {
        const err = new Error('please add products to cart first.')
        err.statusCode = 400
        throw err
    }

    const order = new Order({ userId })
}

exports.deleteOrder = async (req, res, next) => {
    const orderId = req.params.id
    try {
    } catch (error) {
        next(error)
    }
}

// GET ALL ORDER         GET
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

// GET MONTHLY INCOME       GET
exports.getMontlyIncome = async (req, res, next) => {
    const date = new Date()
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
        return res.status(200).json(income)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}
