const express= require('express')
const router=express.Router()
const usersroutes=require('../controllers/userscontroller')
const validateToken = require('../middleware/verifytokenhandler')

router.post('/register',usersroutes.registeruser)
router.post('/login',usersroutes.loginuser)
router.get('/current', validateToken, usersroutes.getuser)


module.exports=router
