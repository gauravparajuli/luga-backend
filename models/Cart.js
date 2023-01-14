const mongoose = require('mongoose')
const { Schema, model } = mongoose

const CartSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            unique: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                    required: true,
                    unique: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
)

module.exports = model('Cart', CartSchema)
