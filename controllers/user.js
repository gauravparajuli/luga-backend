import User from '../models/User.js'

// DELETE USER      DELETE
export const deleteUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        await User.findByIdandDelete(userId)
        res.status(204).send()
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// GET ALL USERS      GET
export const getAllUsers = async (req, res, next) => {
    const newFive = req.query.new
    try {
        const query = newFive
            ? await User.find()
                  .sort({ _id: -1 })
                  .limit(5)
                  .select('username email createdAt')
            : await User.find().select('username email createdAt')
        res.status(204).json(query)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// GET USERS STAT       GET
export const getUsersStats = async (req, res, next) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastYear },
                },
                $project: {
                    month: { $month: '$createdAt' },
                },
                $group: {
                    _id: '$month',
                    total: { $sum: 1 },
                },
            },
        ])
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
