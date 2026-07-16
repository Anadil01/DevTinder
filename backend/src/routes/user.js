const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();



userRouter.get("/user/request/recieved" ,userAuth , async (req , res )=>{
  try{

    const loggedUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
        toUserId:loggedUser._id,
        status:"interested"
    }).populate("fromUserId", "firstName lastName photoUrl age gender about skills");


    res.json({
        message:"Data Fetch Sucessfully!",
        data:connectionRequest
    });

  }catch(error){
    res.status(400).json({message:"Error" +error.message});
  }

});


userRouter.get("/user/connections" , userAuth , async (req , res) =>{
  try{
    const loggedUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or:[
        {toUserId:loggedUser._id , status:"accepted"},
        {fromUserId:loggedUser._id , status:"accepted"}
      ]
    }).populate('fromUserId', "firstName lastName photoUrl age gender about skills")
    .populate("toUserId", "firstName lastName photoUrl age gender about skills");

    const data = connectionRequest.map((row) => {

      if (row.fromUserId._id.toString() === loggedUser._id.toString()) {
          return row.toUserId;
      }
  
      return row.fromUserId;
  });


    res.json({data});




  }catch(error){
    res.status(400).json({message:"ERROR" + error.message});
  }
});