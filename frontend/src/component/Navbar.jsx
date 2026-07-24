import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((store) => store.user);

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center">

        <Link to="/login" className="text-2xl font-bold text-cyan-400">
          DevTinder
        </Link>

        {user ? (
          
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Welcome: {user.firstName} </h1>
            {/* <img src={user.photoUrl} alt="profile img" /> */}
            <Link to="/profile">Profile</Link>
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