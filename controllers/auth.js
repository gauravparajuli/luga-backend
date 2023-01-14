const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User.js')
const {
    validateUserSignin,
    validateUserSignup,
} = require('../validators/user-validator.js')

// CREATE NEW USER      POST
exports.signupUser = async (req, res, next) => {
    const { username, email, password } = req.body

    const { error, value } = validateUserSignup(req.body)

    try {
        if (error) {
            const err = new Error(`Input validation failed.`)
            err.statusCode = 422
            err.details = error.details
            throw err
        }

        // check if email is already registered
        const user = await User.findOne({ email })
        if (user) {
            const err = new Error(`User already registered`)
            err.statusCode = 400
            err.details = error.details
            throw err
        }

        let hashedPassword = await bcrypt.hash(
            password,
            process.env.SALT_ROUNDS || 7
        )

        const newUser = new User({ username, email, password: hashedPassword })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// LOGIN USER       POST
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body
    const { error, value } = userSigninSchema.validate(req.body, {
        abortEarly: false,
    })
    try {
        const userInstance = await User.findOne({ email })
        if (!userInstance) {
            const error = new Error('invalid user or password.')
            error.statusCode = 401
            throw error
        }

        // valid user now check for password
        bcrypt.compare(password, userInstance.password).then((res) => {
            if (!res) {
                const error = new Error('invalid user or password.')
                error.statusCode = 401
                throw error
            }
        })

        const accessToken = jwt.sign(
            {
                id: userInstance._id,
                isAdmin: userInstance.isAdmin,
            },
            process.env.JWT_SECRET_KEY || 'jwtsecretkey',
            { expiresIn: '3d' }
        )

        const { username, _id, ...others } = userInstance._doc

        res.status(200).json({ _id, username, email, accessToken })
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}
