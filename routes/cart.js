const { Router } = require('express')

const isAuthenticated = require('../middlewares/is-authenticated.js')

const cartController = require('../controllers/cart.js')

const router = Router()

router.get('/cartitems', isAuthenticated, cartController.getCart)

router.patch('/cartitems', isAuthenticated, cartController.updateCart)

module.exports = router
