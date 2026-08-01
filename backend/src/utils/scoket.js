const socket = require("socket.io");


const initializeSocket = (Server)=>{
    const io = socket(Server , {
        cors:{
            origin:"http://localhost:5173"
        }
    });
    
    io.on("connection", (socket)=>{
     socket.on("joinChat" , ({userId , targetId})=>{

        const roomId = [userId , targetId].sort().join("_");

        socket.join(roomId);
        console.log(" Joining Room: " +roomId);

     });


     socket.on("sendMessage" , ({userId , targetId , newMessage})=>{
         const roomId = [userId ,targetId].sort().join("_");
         io.to(roomId).emit("messageReceived", {
            id: Date.now(),
            text: newMessage,
            sender: userId,
          });
     });

     socket.on("disconnect" , ()=>{

     });
    });

}



module.exports = initializeSocket;