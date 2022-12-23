import express from 'express'

// import routes here
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/order.js'
import productRoutes from './routes/product.js'

// import custom middlewares here
import { resourceNotFound, errorHandler } from './middlewares/error-handling.js'

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

export default app
