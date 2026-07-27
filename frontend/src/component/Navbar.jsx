import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async ()=>{

    try{
    const res = await axios.post(`${baseUrl}/logout`, {} , {withCredentials:true});
    dispatch(removeUser());

    navigate("/login");
    }catch(error){
      console.log(error.response?.data || error.message);
    }

  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center">

        <Link to={user ? "/feed" :"/login"} className="text-2xl font-bold text-cyan-400">
          DevTinder
        </Link>

        {user ? (
          
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Welcome: {user.firstName} </h1>
            <img className="w-8 rounded-2xl" src={user.photoUrl} alt="profile img" />
            <Link to="/profile">Profile</Link>
            <Link to="/requests">Requests</Link>
            <Link to="/connections">Connections</Link>
            <button className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
             onClick={handleLogout}>Logout</button>
            </div>
          
          
        ) : (
          <div className="flex gap-6 items-center">
            <Link to="/login">Login</Link>
            <Link
              to="/signup"
              className="bg-cyan-500 px-4 py-2 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
}