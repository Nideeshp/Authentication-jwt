const express =require('express')
const router=express.Router()
const contactcontroller=require('../controllers/contactcontroller')
const validateToken = require('../middleware/verifytokenhandler')

router.use(validateToken)

router.get('/',contactcontroller.getContact)

router.post('/',contactcontroller.postContact)

router.get('/:id',contactcontroller.getUser)

router.put('/:id',contactcontroller.updateUser)

router.delete('/:id',contactcontroller.deleteUser)
module.exports=router