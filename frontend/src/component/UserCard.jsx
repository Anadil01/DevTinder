import axios from "axios";
import {baseUrl} from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";
import {toast} from "react-toastify";

function UserCard({ user }) {
  const [loading , setLoading] = useState(false);
  const [animate , setAnimate] = useState("");
    const dispatch = useDispatch();


  const handleRequest = async (status , toUserId)=>{
    if(loading) return;
    try{
      setLoading(true);

      setAnimate(
        status === "interested" ? "translate-x-full rotate-12 opacity-0" : "-translate-x-full rotate-12 opacity-0"
      );

     await axios.post(`${baseUrl}/request/send/${status}/${toUserId}`,{}, {withCredentials:true});
      
     setTimeout(() => {
      dispatch(removeUserFromFeed(toUserId));
    },300);
      
    status === "interested" ? toast.success("Request send") : toast.error("rejeted");
    }catch(error){
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data);
    }finally {
      setAnimate("");
      setLoading(false);
    }
  }
  
  
  return (
    <div className={`relative w-80 h-[560px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900
      transition-all duration-300 ease-in-out ${animate}`}>

      <img
        src={user.photoUrl}
        alt={user.firstName}
        className="w-full h-72 object-cover"
      />

      <div className="p-6 text-white">

        <h1 className="text-3xl font-bold">
          {user.firstName} {user.lastName}
        </h1>

        <p className="text-cyan-400 mt-1">
          Full Stack Developer
        </p>

        <p className="text-gray-300 mt-4 line-clamp-3">
          {user.about}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {user.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 text-gray-400">
          <p>Age: {user.age}</p>
          <p>{user.gender}</p>
        </div>
      </div>

      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-8">

        <button className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-2xl transition" 
        disabled={loading}
        onClick={()=> handleRequest("ignored",user._id)}>
          ✖
        </button>

        <button className="w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-600 text-2xl transition"
        disabled={loading}
        onClick={()=> handleRequest("interested" , user._id)}>
          🤝
        </button>

      </div>
    </div>
  );
}

export default UserCard;