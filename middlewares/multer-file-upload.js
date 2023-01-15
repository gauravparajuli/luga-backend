const multer = require('multer')

// multer configuration here
const storage = multer.memoryStorage()
const imageUpload = multer({ storage }).single('image')

module.exports = imageUpload
