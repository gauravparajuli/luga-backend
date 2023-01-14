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
                unitPrice: {
                    type: Number,
                    required: true,
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
            type: Object,
        },
        status: {
            type: String,
            default: 'unpaid',
        },
    },
    { timestamps: true }
)

module.exports = model('Order', OrderSchema)
