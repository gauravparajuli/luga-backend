import User from '../models/User.js'

export const signupUser = (req, res, next) => {
    const { username, email, password } = req.body
    const newUser = User({ username, email, password })
}

export const loginUser = (req, res, next) => {}
