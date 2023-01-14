const joi = require('joi')

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })

const productSchema = joi.object({
    title: joi.string().min(4).required(),
    description: joi.string().min(4).required(),
    quantity: joi.number().required(),
    categories: joi.array().items(joi.string()),
    price: joi.number().required(),
    size: joi.string(),
    color: joi.string(),
})

module.exports = {
    validateProduct: validator(productSchema),
}
