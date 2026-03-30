import usermodel from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/jsonwebtoken.js";

export const authRegister = asyncHandler(async (req, res) => {
  const { name, email, password} = req.body;

  const user = await usermodel.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  const newuser = await usermodel.create({
    name,
    email,
    password: hashpassword,
  });

  res.status(201).json({
    message: "user created successfully",
    user: newuser,
  });
});




export const authLogin = asyncHandler(async(req,res)=>{
  const {email,password} = req.body

  const user = await usermodel.findOne({email})

  if(!user){
    res.status(401)
    throw new Error("User does not exist");
  }

  const cmpPassword = await bcrypt.compare(password,user.password)

  if(!cmpPassword){
    res.status(401)
      throw new Error("Invalid credentials");
    }

  const token = generateToken(user._id)

 res.status(200).json({
  message: "user logged in successfully",
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token
})

})


export const userProfile = asyncHandler(async(req,res)=>{
 
res.status(200).json(req.user)

})