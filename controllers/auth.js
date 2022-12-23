import bcrypt from 'bcryptjs'

import User from '../models/User.js'

// CREATE NEW USER      POST
export const signupUser = async (req, res, next) => {
    const { username, email, password } = req.body

    let hashedPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS || 8)

    const newUser = new User({ username, email, password: hashedPassword })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}

// LOGIN USER       POST
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const userInstance = await User.findOne({ email })
        if (!userInstance) {
            const error = new Error('invalid user or password')
            error.statusCode = 401
            throw error
        }

        // valid user now check for password
        bcrypt.compare(password, userInstance.password).then((res) => {
            if (!res) {
                const error = new Error('invalid user or password')
                error.statusCode = 401
                throw error
            }
        })

        res.status(200).send('login successfull')
    } catch (error) {
        next(error) // pass to error handling middleware
    }
}