const stripe = require('stripe')(process.env.STRIPE_KEY)
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')

exports.createPayment = async (req, res, next) => {
    const userId = req.user.id
    const source = req.body.source

    try {
        const cart = await Cart.find({ userId: req.user.id })

        // compute total price in dollars
        const total = cart.products.reduce(
            (acc, currentVal) =>
                acc + currentVal.quantity * currentVal.unitPrice,
            0
        )

        stripe.charges.create(
            {
                source,
                amount: total * 100, // in cents
                currency: 'usd',
            },
            async (stripeErr, stripeRes) => {
                if (stripeErr) {
                    const error = new Error('error encountered in payment.')
                    error.details = stripeErr
                    throw error
                } else {
                    const { amount_captured, billing_details, receipt_url } =
                        stripeRes

                    // create new order entry in database
                    const order = new Order({
                        userId,
                        products: cart.products,
                        amount: amount_captured,
                        address: billing_details.address,
                        receipt: receipt_url,
                    })

                    await order.save()

                    // decrease product quantity
                    cart.products.forEach(async (product) => {
                        const dbProduct = await Product.findById(
                            product.productId
                        )
                        dbProduct.quantity =
                            dbProduct.quantity - product.quantity
                        dbProduct.save()
                    })

                    // empty the cart now
                    cart.products = []
                    await cart.save()

                    res.status(200).send()
                }
            }
        )
    } catch (error) {
        next(error)
    }
}
