/**
 * ERROR 404 : SLEEP NOT FOUND
 */

const asyncHandler=require('express-async-handler')
const contacts=require('../models/contactmodel')

module.exports={
    getContact:asyncHandler( async (req,res)=>{
        const contact= await contacts.find({user_id:req.user.id})
        res.status(200).json(contact)
    }),


    postContact: asyncHandler(async (req,res)=>{
        console.log("this is body:",req.body);
        const {name ,email,phone}=req.body
        if(!name || !email || !phone){
            res.status(400)
            throw new Error("all fiels are mandotory")
        }

        const contact= await contacts.create({
            name,
            email,
            phone,
            user_id:req.user.id
        })
        res.status(201).json(contact)
    }),




    getUser: asyncHandler( async (req,res)=>{
        const contact= await contacts.findById(req.params.id)
        if(!contact){
            res.status(404)
            throw new Error("contact not founud")
        }
        res.status(200).json(contact)
    }),



    updateUser: asyncHandler( async (req,res)=>{
        const contact=await contacts.findById(req.params.id)
        if(!contact){
            res.status(404)
            throw new Error("user not found")
        }
        const updateUser=await contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.status(201).json(updateUser)
    }),


    deleteUser :asyncHandler( async (req,res)=>{
        res.status(200).json({message:`Delete contact for ${req.params.id}`})
    }),

}