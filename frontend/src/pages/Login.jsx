import { Link } from "react-router-dom";

export default function Login() {
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
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition"
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