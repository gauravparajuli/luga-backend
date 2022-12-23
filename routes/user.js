import { Router } from 'express'

import isAdmin from '../middlewares/is-admin.js'
import isAuthenticated from '../middlewares/is-authenticated.js'

import * as userController from '../controllers/user.js'

const router = Router()

router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser)

router.get('/', isAuthenticated, isAdmin, userController.getAllUsers)

router.get('/stats', isAuthenticated, isAdmin, userController.getUsersStats)

export default router
