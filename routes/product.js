import { Router } from 'express'

import isAdmin from '../middlewares/is-admin.js'
import isAuthenticated from '../middlewares/is-authenticated.js'

import * as productController from '../controllers/product'

const router = Router()

router.get('/', productController.getAllProducts)

router.get('/:id', productController.getProduct)

router.post('/', isAuthenticated, isAdmin, productController.addProduct)

router.put('/:id', isAuthenticated, isAdmin, productController.addProduct)

router.delete('/:id', isAuthenticated, isAdmin, productController.deleteProduct)

export default router
