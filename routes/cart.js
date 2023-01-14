const { Router } = require('express')

const isAdmin = require('../middlewares/is-admin.js')
const isAuthenticated = require('../middlewares/is-authenticated.js')

const cartController = require('../controllers/cart.js')

const router = Router()

router.get('/', isAuthenticated, isAdmin, cartController.getAllCarts)

router.get('/:id', isAuthenticated, cartController.getCart)

router.put('/:id', isAuthenticated, cartController.updateCart)

module.exports = router
