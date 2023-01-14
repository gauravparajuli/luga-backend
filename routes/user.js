const { Router } = require('express')

const isAdmin = require('../middlewares/is-admin.js')
const isAuthenticated = require('../middlewares/is-authenticated.js')

const userController = require('../controllers/user.js')

const router = Router()

router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser)

router.get('/', isAuthenticated, isAdmin, userController.getAllUsers)

router.get('/stats', isAuthenticated, isAdmin, userController.getUsersStats)

module.exports = router
