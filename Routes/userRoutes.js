const express = require('express')
const router = express.Router()
const {login,currentUser,register} = require('../controllers/userControllers.js')
const validateToken = require('../middlewares/validateTokenHandler.js')

router.route('/login').post(login)

router.route('/register').post(register)

router.get('/currentUser' , validateToken,  currentUser)

module.exports = router