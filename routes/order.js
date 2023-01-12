import { Router } from 'express'

import isAdmin from '../middlewares/is-admin.js'
import isAuthenticated from '../middlewares/is-authenticated.js'

import * as orderController from '../controllers/order.js'

const router = Router()

router.get('/', isAuthenticated, isAdmin, orderController.getAllOrders)

router.post('/', isAuthenticated, orderController.createOrder)

router.get('/:id', isAuthenticated, orderController.getOrder)

router.put('/:id', isAuthenticated, orderController.updateOrder)

router.delete('/:id', isAuthenticated, isAdmin, orderController.deleteOrder)

export default router
