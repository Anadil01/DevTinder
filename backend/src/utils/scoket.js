const socket = require("socket.io");
const Message = require("../models/message");

const initializeSocket = (Server)=>{
    const io = socket(Server , {
        cors:{
            origin: [
                "http://localhost:5173",
                "https://devtinder-sepia.vercel.app"
            ],
            credentials: true
        }
    });
    
    io.on("connection", (socket)=>{
     socket.on("joinChat" , ({userId , targetId})=>{

        const roomId = [userId , targetId].sort().join("_");

        socket.join(roomId);
        console.log(" Joining Room: " +roomId);

     });


     socket.on("sendMessage" , async ({userId , targetId , newMessage})=>{
        console.log(newMessage);
        try{
            const roomId = [userId ,targetId].sort().join("_");
            
            const message = await Message.create({
                sender:userId,
                receiver:targetId,
                text:newMessage
            });

            io.to(roomId).emit("messageReceived", {
            _id: message._id,
            text: message.text,
            sender: message.sender,
            receiver: message.receiver,
            createdAt: message.createdAt,
             });
   
        }catch(error){
            console.log(error);
        }
         
     });

     socket.on("disconnect" , ()=>{
        console.log("Socket disconnected:", socket.id);
     });
    });

    return io;

}



module.exports = initializeSocket;