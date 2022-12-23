import { Router } from 'express'

import isAdmin from '../middlewares/is-admin'
import isAuthenticated from '../middlewares/is-authenticated'

const router = Router()

router.delete('/:userId')

export default router
