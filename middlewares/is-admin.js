const isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next() // donot block user with admin priveleges
    } else {
        res.status(403).json({
            message: 'you are not authorized to access this resource.',
        })
    }
}

export default isAdmin
