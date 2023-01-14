const mongoose = require('mongoose')
const { Schema, model } = mongoose

const OrderSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
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
        amount: {
            type: Number,
            required: true,
        },
        address: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
        },
    },
    { timestamps: true }
)

module.exports =  model('Order', OrderSchema)
