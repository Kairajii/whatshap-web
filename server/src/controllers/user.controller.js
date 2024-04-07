import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';
import successDataResponse from '../utils/response.util.js';
import generateToken from '../config/generateToken.js';

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      console.log("Please Enter all the Feilds")
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      console.log("User already exists")
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) successDataResponse(req,res,{
        _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
    else {
      res.status(400);
      console.log("User not found")
      throw new Error("User not found");
    }
  });


  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user) successDataResponse(req,res,{
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })
    else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

  const allUsers = asyncHandler(async(req,res)=>{
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
// const users = await User.find(keyword).find();
    //   res.send(users);
  successDataResponse(req,res,users)
  });

  export {
    registerUser,
    loginUser,
    allUsers
  }