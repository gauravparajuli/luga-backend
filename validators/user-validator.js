const joi = require('joi')

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })

const userSigninSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
})

const userSignupSchema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
})

module.exports = {
    validateUserSignin: validator(userSigninSchema),
    validateUserSignup: validator(userSignupSchema),
}
