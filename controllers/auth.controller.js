import userModel from "../models/usermodel.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ 
      name,
       email, 
       password:hashPassword 
      });

    await newUser.save();

    // Generate token after successfully saving the new user
    generateToken(res, newUser._id);

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(res, user._id);

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('jwt','',{
      httpOnly:true,
      expires:new Date(0)
    })
    return res.status(200).json({message:"User logged out"})
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" })
    ;
  }
};

export const profile = async (req, res) => {
  try {
    return res.status(200).json({ mesage: "profile is working" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
