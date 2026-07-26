import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../utils/constant";
import {useDispatch} from "react-redux";
import {addUser} from '../utils/userSlice';

export default function Login() {
  const [emailId , setEmailId] = useState("");
  const [password , setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ()=>{
   
    try{

      const res = await axios.post(`${baseUrl}/login` , {emailId , password}, {withCredentials:true});
      dispatch(addUser(res.data));

      
     navigate("/feed")
    }catch(error){
      console.log(error.response?.data || error.message);
    }
  }


  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center text-cyan-400">
          DevTinder
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Connect with Developers
        </p>

        <form className="mt-8 space-y-5">

          <div>
            <label className="block text-white mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={emailId}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onChange={(e)=> setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <button 
           type="button"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          New here?{" "}
          <Link
            to="/signup"
            className="text-cyan-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}