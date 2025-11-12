const express = require('express')
const {getProperties,getPropertyById, createProperty, updatePropertyById, deletePropertyById} = require('../Controller/propertyController')
const validateHandlerToken = require('../middleware/validateHandlerToken')
const roleCheck = require('../middleware/roleMiddleware')
const upload = require('../middleware/uploadMiddleware')
const router = express.Router()

router.get('/', getProperties)
router.get('/:id',  getPropertyById)


router.post('/', validateHandlerToken, roleCheck(['admin', 'agent']), upload.single('image'), createProperty)

router.put('/:id', validateHandlerToken, roleCheck(['admin', 'agent']), updatePropertyById)

router.delete('/:id', validateHandlerToken, roleCheck(['admin']), deletePropertyById)

module.exports = router