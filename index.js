const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config() // load the environment variables

const { app } = require('./app')

console.log(process.env.PORT)

mongoose
    .connect(
        process.env.NODE_ENV === 'production'
            ? process.env.CONNECTION_URI
            : 'mongodb://localhost:27017/luga-backend'
    )
    .then(() => {
        const currentPort = process.env.PORT || 5000
        app.listen(currentPort)
        console.log(`=> server running on port ${currentPort}`)
    })
    .catch((err) => console.log(err))

module.exports = []
