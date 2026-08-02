const express = require('express');
const {userAuth} = require("../middlewares/auth");
const Message = require("../models/message");

const chatRouter = express.Router();


chatRouter.get("/chat/:targetId" , userAuth ,async (req , res)=>{
    
    try{
    const userId = req.user._id;
    const targetId = req.params.targetId;

    const message = await Message.find({
        $or:[
            {
            sender: userId,
            receiver: targetId,
            },
            {
            sender: targetId,
            receiver: userId,
            },
        ]
    }).sort({ createdAt: 1 });

    res.json(message);
    

    }catch(error){
        res.status(500).json(error);
    }

});


module.exports = chatRouter;