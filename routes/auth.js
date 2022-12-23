import { Router } from 'express'

import * as authController from '../controllers/auth.js'

const router = Router()

router.post('/signup', authController.signupUser)

export default router
