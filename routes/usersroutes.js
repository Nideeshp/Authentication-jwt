const express= require('express')
const router=express.Router()
const usersroutes=require('../controllers/userscontroller')
const validateToken = require('../middleware/verifytokenhandler')
const User= require('../models/usermodel')

router.post('/register',usersroutes.registeruser)
router.post('/login',usersroutes.loginuser)
router.get('/current', validateToken, usersroutes.getuser)



router.get('/getusers',async(req,res)=>{
    const users= await User.find()

    res.status(200).json({users})
})


module.exports=router
