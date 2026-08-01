import { use, useEffect, useState , useRef } from "react";
import { useParams  } from "react-router-dom";
import createSocketConnection from "../utils/socket";
import {useSelector} from "react-redux";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
 
    
    
    const {targetId} = useParams();
    const user = useSelector((store) => store.user);
    const connections = useSelector((store) => store.connection);

    const targetUser = connections.find(
      (user) => user._id === targetId
    );

    const userId = user?._id;
  
    const socketRef = useRef(null);

    useEffect(()=>{
      if(!userId){
        return
      };


      socketRef.current = createSocketConnection();

      socketRef.current.emit("joinChat" , {userId ,targetId});

      socketRef.current.on("messageReceived" , (message)=>{
        console.log("Received:", message);
       setMessages(prev => [...prev , message]);
      });

      return () => {
        socketRef.current.off("messageReceived");
        socketRef.current.disconnect();
      };

    }, [userId , targetId]);


    // handle function
     const sendMessage = ()=>{
      socketRef.current.emit("sendMessage" , {
          userId ,
          targetId ,
          newMessage
        });
        setNewMessage("");
      }


    return ( 
        <div className="min-h-screen bg-slate-700 flex justify-center py-6">
        <div className="w-full max-w-3xl bg-slate-900 rounded-xl shadow-lg flex flex-col h-[90vh]">
      {/* Header */}
      <div className="bg-slate-800 p-4 shadow-md">
        <h1 className="text-xl font-semibold text-blue-500">
          Chat with: {targetUser?.firstName}
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === userId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-white ${
                msg.sender === userId? 
                    "bg-blue-600 rounded-br-none"
                  : "bg-slate-700 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-slate-800 p-4 flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg outline-none"
        />

        <button onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg"
        >
          Send
        </button>
      </div>
      </div>
    </div>
    )};


export default Chat;