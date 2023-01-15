const { Router } = require('express')

const isAdmin = require('../middlewares/is-admin.js')
const isAuthenticated = require('../middlewares/is-authenticated.js')
const imageUpload = require('../middlewares/multer-file-upload')

const productController = require('../controllers/product.js')

const router = Router()

router.get('/', productController.getAllProducts)

router.get('/:id', productController.getProduct)

router.post(
    '/',
    isAuthenticated,
    isAdmin,
    imageUpload,
    productController.addProduct
)

router.patch(
    '/:id',
    isAuthenticated,
    isAdmin,
    imageUpload,
    productController.updateProduct
)

router.delete('/:id', isAuthenticated, isAdmin, productController.deleteProduct)

module.exports = router
