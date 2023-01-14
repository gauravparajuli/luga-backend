const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = require('./app')

dotenv.config()

mongoose
    .connect(
        process.NODE_ENV === 'production'
            ? process.env.CONNECTION_URI
            : 'mongodb://localhost:27017/luga-backend'
    )
    .then(() => {
        const currentPort = process.env.PORT || 5000
        app.listen(currentPort)
        console.log(`=> server running on port ${currentPort}`)
    })
    .catch((err) => console.log(err))
