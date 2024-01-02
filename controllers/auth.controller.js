const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const joiUser = require("../joiModels/joiUser");
const {signAccessToken} = require('../middleware/jwtMiddleware')


const register = async (req, res, next) => {
  try {

    const result = await joiUser.validateAsync(req.body);

    const { name, email, password } = result;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ messsage: "User already existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const userData = await user.save();
    const accessToken = await signAccessToken(userData.id)

    return res
      .status(201)
      .json({ message: "User Created Successfully", userData, accessToken });
  } catch (error) {
    if(error.isJoi === true) error.status = 422
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {

    try {
        const body = await joiUser.validateAsync(req.body)

        const {email, password}= body
        if(!email || !password){
            return res.status(400).json({message:"Email or Password Required"})
        }

        const userData = await userModel.findOne({email})

        if(!userData){
            return res.status(404).json({messsage:"User Not Found"})
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password)

        if(!isPasswordValid){
            return res.status(404).json({message:"Email or Password Required"})
        }


        const accessToken = await signAccessToken(userData.is)

        return res.status(200).json({message:"User logged Successfully", accessToken})

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }

};

const refreshToken = async (req, res, next) => {
  res.send("refresh token route");
};

const logout = async (req, res, next) => {
  res.send("logout route");
};

const home = async (req,res)=>{
  return res.status(200).json({message:"Access the home"})
}

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  home
};
