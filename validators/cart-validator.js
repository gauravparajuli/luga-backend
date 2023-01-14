const joi = require('joi')

const isValidObjectId = require('../utils/is-valid-objectid')

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })

const cartItemsSchema = joi.object({
    products: joi
        .array()
        .items(
            joi.object({
                productId: joi
                    .string()
                    .custom((value, helper) =>
                        isValidObjectId(value)
                            ? true
                            : helper.error('invalid product id.')
                    )
                    .required(),
                quantity: joi.number().default(1),
            })
        )
        .required(),
})

module.exports = {
    validateCartItems: validator(cartItemsSchema),
}
