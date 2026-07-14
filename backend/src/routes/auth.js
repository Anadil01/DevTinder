const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const User = require ("../models/user");

const {validateSignupData} = require("../utils/validation");


authRouter.post("/signup" , async (req ,res)=>{

   try{
    validateSignupData(req);

    const {firstName , lastName , emailId , password} = req.body;

    const hashPassword = await bcrypt.hash(password ,10);

    const user = new User({
        firstName,
        lastName,
        emailId,
        password:hashPassword
    });

    await user.save();
    res.send("User Signup Sucessfully!!");

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

        res.cookie("token", token);
        res.send("Login Sucessfully!");
    }else{
        throw new Error ("Invalid Credentials!");
    }
   }catch(error){
    res.status(400).send("ERROR" +error.message);

   }
});



authRouter.post("/logout" , async (req , res) =>{
    res.cookie("token" , null ,{expires: new Date(Date.now())});

    res.send("Logout Sucessfully!!");
})


module.exports = authRouter;
