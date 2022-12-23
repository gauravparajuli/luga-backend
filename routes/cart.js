import { Router } from 'express'

import isAdmin from '../middlewares/is-admin.js'
import isAuthenticated from '../middlewares/is-authenticated.js'

import * as cartController from '../controllers/cart.js'

const router = Router()

router.get('/', isAuthenticated, isAdmin, cartController.getAllCarts)

router.get('/:id', isAuthenticated, cartController.getCart)

router.put('/:id', isAuthenticated, cartController.updateCart)

export default router
