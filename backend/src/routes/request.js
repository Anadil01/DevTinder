const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId" , userAuth , async (req , res)=>{

    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested" , "ignore"];

        if(!allowedStatus.includes(status)){
            throw new Error ("Invalid request!");
        }
   
        if(fromUserId.equals(toUserId)){
            throw new Error("You cannot send a request to yourself!");
        }

        const toUser = await User.findById(toUserId);

        if(!toUser){
            throw new Error("User not found!");
        }

     const existingConnRequest = await ConnectionRequest.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId , toUserId:fromUserId}
        ]
     });

     if(existingConnRequest){
        throw new Error("Connection request already eexist!");
     }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        const message =
                status === "interested"
                    ? `You have shown interest in ${toUser.firstName}.`
                    : `You have ignored ${toUser.firstName}.`;


        res.json({
            message,
            data
        });
       
    }catch(error){
        res.status(400).send("ERROR" +error.message);
    }
    

});


requestRouter.post("/request/review/:status/:requestId", userAuth  ,async (req , res )=>{

    try{
        const loggedUser = req.user;

    const {requestId , status} = req.params;

    const allowedStatus = ["accepted" , "rejected"];

    if(!allowedStatus.includes(status)){
        throw new Error ("Invalid Request");
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedUser._id,
        status:"interested"
    });

    if(!connectionRequest){
        throw new Error ("Request Not Found!");
    }


    connectionRequest.status = status;

    const data = await connectionRequest.save();


    res.json({
        message: `Request ${status}`,
        data
    });
}catch(error){
    res.status(400).send("ERROR" +error.message);
}
});

module.exports= requestRouter;