import io from "socket.io-client";
import { baseUrl } from "./constant";

const SOCKET_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:7777" 
    : "https://api-devtinder.2bd.net";

    const createSocketConnection = () => {
      return io(SOCKET_URL, {
          withCredentials: true // Still needed if you pass cookies/auth headers
      });
  };

export default createSocketConnection;