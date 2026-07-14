const express = require("express");
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();


profileRouter.get("/profile/view" , userAuth, async (req , res) =>{

    try{
        const user = req.user;

        res.send(user);
    }catch(error){
        res.status(400).send("ERROR" +error.message);
    }
});


profileRouter.patch("/profile/edit" , userAuth , async (req ,res ) =>{
   try{

    if(!validateEditProfileData(req)){
        throw new Error("Field is not allowed to edit!");
    }

    const loggedUser = req.user;
    Object.keys(req.body).forEach((key) => loggedUser[key] = req.body[key]);
    

    await loggedUser.save();
    res.send(` ${loggedUser.firstName}, Your Profile updated suceessfuly!`);

   }catch(error){
    res.status(400).send("ERROR" + error.message);
   }

});


profileRouter.patch("/profile/password" ,userAuth , async (req , res)=>{

  try{
    const user = req.user;

    const {password} = req.body;


    if(!password){
        throw new Error ("Password is Required");
    }

    const hashPassword = await bcrypt.hash(password , 10);

    user.password = hashPassword;
    await user.save();

    res.status(200).json({
        message:"Password updated successfully",
    })


  }catch(error){
    res.status(400).send("ERROR" + error.message);
  };

});


module.exports = profileRouter;