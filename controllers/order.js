const Order = require('../models/Order.js')

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
