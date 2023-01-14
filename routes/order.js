const { Router } = require('express')

const isAdmin = require('../middlewares/is-admin.js')
const isAuthenticated = require('../middlewares/is-authenticated.js')

const orderController = require('../controllers/order.js')

const router = Router()

router.get('/', isAuthenticated, isAdmin, orderController.getAllOrders)

router.post('/', isAuthenticated, orderController.createOrder)

router.get('/:id', isAuthenticated, orderController.getOrder)

router.put('/:id', isAuthenticated, orderController.updateOrder)

router.delete('/:id', isAuthenticated, isAdmin, orderController.deleteOrder)

module.exports = router
