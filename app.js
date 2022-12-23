import express from 'express'

// import routes here
import userRoutes from './routes/user.js'

const app = express()

// register your middlewares here
app.use(express.json())

// register your routes here
app.use('/api/v1', userRoutes)

export default app
