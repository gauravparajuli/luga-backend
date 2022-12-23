export const resourceNotFound = (req, res, next) => {
    const error = new Error(`${req.originalUrl} was not found in this server.`)
    error.statusCode = 404
    next(error)
}

export const errorHandler = (error, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        if (error.statusCode === 404) {
            res.status(error.statusCode).send(error.message)
            return next() // special exception for 404 errors in production
        }
        res.status(500).send('<h1>500 Internal Server Error</h1>')
    } else {
        // in development mode so we report errors
        res.status(error.statusCode ? error.statusCode : 500).json(error)
    }
    next()
}
