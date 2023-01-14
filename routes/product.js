const { Router } = require('express')

const isAdmin = require('../middlewares/is-admin.js')
const isAuthenticated = require('../middlewares/is-authenticated.js')

const productController = require('../controllers/product.js')

const router = Router()

router.get('/', productController.getAllProducts)

router.get('/:id', productController.getProduct)

router.post('/', isAuthenticated, isAdmin, productController.addProduct)

router.patch('/:id', isAuthenticated, isAdmin, productController.updateProduct)

router.delete('/:id', isAuthenticated, isAdmin, productController.deleteProduct)

module.exports = router
