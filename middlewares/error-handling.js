exports.resourceNotFound = (req, res, next) => {
    const error = new Error(`${req.originalUrl} was not found in this server.`)
    error.statusCode = 404
    next(error)
}

exports.errorHandler = (error, req, res, next) => {
    if (error.statusCode === 404) {
        res.status(error.statusCode).send(error.message)
        return next() // special exception for 404 errors
    }

    res.status(error.statusCode ? error.statusCode : 500).json({
        message: error.message,
        error,
    })
    next()
}
