const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        quantity: {
            type: Number,
            required: true,
        },
        categories: [
            {
                type: String,
            },
        ],
        size: {
            type: String,
        },
        color: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('Product', ProductSchema)
