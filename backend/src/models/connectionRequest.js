const mongoose = require ('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
       fromUserId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref: "User"
       },
       toUserId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref: "User"
       } ,
       status:{
        type:String,
        required:true,
        enum:{
            values:["ignore" , "interested" , "accepted" , "rejected"],
            message:"Invalid request!"
        }
       }
},
{
 timestamps:true
}

);


ConnectionRequestSchema.index(
    {
    fromUserId:1,
    toUserId:1
},
    {
        unique: true,
    }
);

const ConnectionRequest = new mongoose.model("connectionRequest" ,ConnectionRequestSchema);

module.exports= ConnectionRequest;