const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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


userRouter.get("/feed" , userAuth , async (req , res) =>{


try{

  const loggedUser = req.user;

  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10 , 50);

  const skip = (page - 1) * limit;

  const connectionRequest = await ConnectionRequest.find({
   $or:[
    {fromUserId:loggedUser._id},
    {toUserId:loggedUser._id}
   ],
   status: {
    $in: ["ignored", "interested", "accepted"]
}
  }).select("fromUserId toUserId");

  const hideUsersFromFeed = new Set();

  connectionRequest.forEach((request) => {
    hideUsersFromFeed.add(request.fromUserId.toString());
    hideUsersFromFeed.add(request.toUserId.toString());
  });

  const users = await User.find({
    _id: {
      $nin: [...hideUsersFromFeed],
      $ne: loggedUser._id
  }
  }).select("firstName lastName photoUrl age gender about skills")
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

  
  res.send(users);

}catch(error){
  res.status(400).json({message:"ERROR" +error.message});
}

});


module.exports = userRouter;