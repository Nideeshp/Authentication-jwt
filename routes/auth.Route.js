const express = require('express')
const authcontroller= require('../controllers/auth.controller.js')
const router = express.Router()

router.post('/register',authcontroller.register)
router.post('/login',authcontroller.login)
router.post('/refreshToken',authcontroller.refreshToken)
router.delete('/logout',authcontroller.logout)



module.exports = router