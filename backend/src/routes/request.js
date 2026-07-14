const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();


requestRouter.get("/sendConnectionRequest" , userAuth , async (req , res)=>{

    try{
        const user = req.user;

        res.send("Connection request send by :" +user.firstName);
    }catch(error){
        res.status(400).send("ERROR" +error.message);
    }
    

});


module.exports= requestRouter;