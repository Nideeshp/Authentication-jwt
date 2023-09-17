const mongoose= require('mongoose')


const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add user name"]
    },
    email:{
        type:String,
        required:[true,"Please add user email"],
        unique:[true,"Email already been taken"]
    },
    password:{
        type:String,
        required:[true,"Please add password"]
    }
},{
    timestamps:true
})

module.exports= mongoose.model("User",userSchema)