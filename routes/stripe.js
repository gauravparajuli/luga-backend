const { Router } = require('express')

const stripeController = require('../controllers/stripe')
const isAuthenticated = require('../middlewares/is-authenticated.js')

router = Router()

router.post('/payment', isAuthenticated, stripeController.createPayment)

module.exports = router
