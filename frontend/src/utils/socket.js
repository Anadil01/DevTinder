import io from "socket.io-client";
import { baseUrl } from "./constant";


const createSocketConnection = ()=>{
    return io(baseUrl);
};

export default createSocketConnection;