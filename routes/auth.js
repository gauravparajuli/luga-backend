const { Router } = require('express')

const authController = require('../controllers/auth.js')

const router = Router()

router.post('/signup', authController.signupUser)

router.post('/login', authController.loginUser)

module.exports = router
