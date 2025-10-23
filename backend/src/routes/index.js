const express = require('express')
const router = express.Router()

router.post('/upload', require('../controllers/uploadController'))
router.post('/share', require('../controllers/shareController'))
router.get('/share/:token', require('../controllers/shareController').get)
router.patch('/revoke', require('../controllers/shareController').revoke)
router.delete('/file/:id', require('../controllers/uploadController').delete)
router.get('/logs', require('../controllers/logsController'))

module.exports = router
