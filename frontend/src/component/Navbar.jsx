import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-cyan-400">
          DevTinder
        </Link>

        {/* Right Side */}
        <div className="flex gap-6 items-center">
          <Link
            to="/login"
            className="hover:text-cyan-400 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
}