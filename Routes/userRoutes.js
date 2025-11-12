const express = require('express')
const {registerUser, loginUser, currentUser} = require('../Controller/userController')
const router = express.Router()
const validateHandlerToken = require('../middleware/validateHandlerToken')


router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/current',validateHandlerToken,currentUser)

module.exports = router