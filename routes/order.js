const { Router } = require('express')

const isAdmin = require('../middlewares/is-admin.js')
const isAuthenticated = require('../middlewares/is-authenticated.js')

const orderController = require('../controllers/order.js')

const router = Router()

router.get('/', isAuthenticated, isAdmin, orderController.getAllOrders)

router.post('/', isAuthenticated, orderController.createMyOrder)

router.delete('/:id', isAuthenticated, isAdmin, orderController.deleteOrder)

router.get('/stats', isAuthenticated, isAdmin, orderController.getMontlyIncome)

module.exports = router
