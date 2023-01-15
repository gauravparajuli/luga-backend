const express = require('express')

// import routes here
const userRoutes = require('./routes/user.js')
const authRoutes = require('./routes/auth.js')
const cartRoutes = require('./routes/cart.js')
const orderRoutes = require('./routes/order.js')
const productRoutes = require('./routes/product.js')

// import custom middlewares here
const {
    resourceNotFound,
    errorHandler,
} = require('./middlewares/error-handling.js')

const app = express()

// register your middlewares here
app.use(express.json())

// register your routes here
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/product', productRoutes)

// register 404 and error handling middleware
app.use(resourceNotFound)
app.use(errorHandler)

module.exports = {
    app,
}
