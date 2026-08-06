const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const User = require ("../models/user");

const {validateSignupData} = require("../utils/validation");


authRouter.post("/signup" , async (req ,res)=>{

   try{
    validateSignupData(req);

    const {firstName , lastName , emailId , password} = req.body;
  
    const existUser = await User.findOne({emailId:emailId});
    if(existUser){
        return res.status(409).json({message:"User already exists"});
    }
    const hashPassword = await bcrypt.hash(password ,10);

    const user = new User({
        firstName,
        lastName,
        emailId,
        password:hashPassword
    });
    await user.save();
    const token = await user.getJWT();

    res.cookie("token" , token ,{
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
   
    
    res.status(201).json({
        message:"User created successfully",
        user:{
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        emailId:user.emailId
        },
    });

   }catch(error){

    res.status(400).send("ERROR" +error.message);

   }

});


authRouter.post("/login" , async (req , res)=>{
   const {emailId , password} = req.body;


   try{
    const user = await User.findOne({emailId:emailId});

    if(!user){
        throw new Error("Invalid Credentials!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid){
        const token = await user.getJWT();

        res.cookie("token", token , {
            httpOnly: true,
            sameSite: "none",
            secure:true,
          });
        res.send(user);
    }else{
        throw new Error ("Invalid Credentials!");
    }
   }catch(error){
    res.status(400).send("ERROR" +error.message);

   }
});



authRouter.post("/logout" , async (req , res) =>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });

    res.status(200).json({
        message: "Logout successfully",
    });
})


module.exports = authRouter;
