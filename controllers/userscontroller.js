const asyncHandler= require('express-async-handler')
const User= require('../models/usermodel')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

module.exports={
    registeruser: async (req, res) => {
        try {
          const { name, email, password } = req.body;
          console.log(req.body);

      
          if (!name || !email || !password) {
            res.status(400);
            throw new Error("Something is missing");
          }
      
          const userAvailable = await User.findOne({ email });
      
          if (userAvailable) {
            res.status(400);
            throw new Error("User already registered");
          }
      
          const hashedPassword = await bcrypt.hash(password, 10);
          console.log(hashedPassword);
      
          const user = await User.create({
            name,
            email,
            password: hashedPassword,
          });
      
          console.log("User is this ", user);
      
          res.json({ message: "Registration successful" });
        } catch (error) {
          console.error("Error in registeruser:", error);
          res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
        }
      },
      

    loginuser:asyncHandler(async (req,res)=>{

        const {email, password} = req.body

        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password,user.password))){
            const accessToken= jwt.sign({
                user:{
                    name:user.name,
                    email:user.email,
                    id:user.id
                }
            },process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
            )
            res.status(200).json({accessToken})
        }else{
            res.status(401)
            throw new Error("Email or password is invalid")
        }
    }),



    getuser:asyncHandler(async (req,res)=>{
        res.json(req.user)

        res.json({message:"current user"})
    })

}
