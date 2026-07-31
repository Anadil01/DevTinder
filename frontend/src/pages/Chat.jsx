import { useState } from "react";
import { useParams } from "react-router-dom";

function Chat() {
    const [message , setMessage] = useState("");
    const {targetId} = useParams();

     // Dummy messages
  const messages = [
    { id: 1, text: "Hi!", sender: "other" },
    { id: 2, text: "Hello 👋", sender: "me" },
    { id: 3, text: "How are you?", sender: "other" },
    { id: 4, text: "I'm doing great!", sender: "me" },
  ];

    return ( 
        <div className="min-h-screen bg-slate-700 flex justify-center py-6">
        <div className="w-full max-w-3xl bg-slate-900 rounded-xl shadow-lg flex flex-col h-[90vh]">
      {/* Header */}
      <div className="bg-slate-800 p-4 shadow-md">
        <h1 className="text-xl font-semibold text-green-500">
          Chat with {targetId}
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-white ${
                msg.sender === "me"
                  ? "bg-blue-600 rounded-br-none"
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg outline-none"
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg"
        >
          Send
        </button>
      </div>
      </div>
    </div>
     );
}

export default Chat;