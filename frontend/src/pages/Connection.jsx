import axios from "axios";
import { baseUrl } from "../utils/constant";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addConnection } from "../utils/connectionSlice";



function Connection() {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection)
     
    const fetchConnections = async ()=>{    
        try{
        const res = await axios.get(`${baseUrl}/user/connections` , {withCredentials:true});
        dispatch(addConnection(res.data.data));
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[]);
    if(!connections)return<h1>You dont have connection!</h1>
    return ( 
        <div className="max-w-3xl mx-auto mt-10">
    <h1 className="text-3xl font-bold text-center mb-6">
      My Connections
    </h1>

    {connections.map((connection) => (
      <div
        key={connection._id}
        className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg mb-4"
      >
        <img
          src={connection.photoUrl}
          alt={connection.firstName}
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold text-white">
            {connection.firstName} {connection.lastName}
          </h2>

          <p className="text-white text-sm">{connection.about}</p>

          <p >{connection.age}  {connection.gender}</p>
        </div>
      </div>
    ))}
  </div>
     );
}

export default Connection;