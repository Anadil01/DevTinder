import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../utils/constant";
import {useDispatch} from "react-redux";
import {addUser} from '../utils/userSlice';
import {toast} from "react-toastify";

export default function Login() {
  const [emailId , setEmailId] = useState("");
  const [password , setPassword] = useState("");
  const [error , setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ()=>{
   
    try{

      const res = await axios.post(`${baseUrl}/login` , {emailId , password}, {withCredentials:true});
      dispatch(addUser(res.data));

     toast.success("Welcome back");
     navigate("/feed");
    }catch (err) {
      console.log("Full error:", err.response?.data || err.message);
      
      const errorData = err.response?.data;
      
      // Safely extract a string message, no matter what format the backend sends
      let errorMessage = "An unexpected error occurred";
      
      if (typeof errorData === "string") {
        errorMessage = errorData; // If backend sent a plain text string
      } else if (errorData && typeof errorData === "object") {
        // If backend sent an object like { error: "...", message: "..." }
        errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
      } else {
        errorMessage = err.message; // Fallback to Axios error
      }
    
      setError(errorMessage);
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
           <p className="text-red-600">{error}</p>
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