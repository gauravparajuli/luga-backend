import jwt from 'jsonwebtoken'

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.JWT_SECRET_KEY || 'jwtsecretkey',
            (err, user) => {
                if (err) {
                    res.status(403).json({
                        message: 'invalid token.',
                    })
                } else {
                    req.user = user
                    next()
                }
            }
        )
    } else {
        res.status(401).json({
            message: 'you are not authenticated.',
        })
    }
}

export default isAuthenticated
