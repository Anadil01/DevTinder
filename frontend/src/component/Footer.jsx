import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 border-t border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

        {/* Left */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-cyan-400">
            DevTinder
          </h2>
          <p className="text-sm mt-1">
            © 2026 All rights reserved.
          </p>
        </div>

        {/* Center */}
        <div className="flex gap-6 my-4 md:my-0">
          <Link to="/about" className="hover:text-cyan-400 transition">
            About
          </Link>

          <Link to="/privacy" className="hover:text-cyan-400 transition">
            Privacy
          </Link>

          <Link to="/terms" className="hover:text-cyan-400 transition">
            Terms
          </Link>

          <Link to="/contact" className="hover:text-cyan-400 transition">
            Contact
          </Link>
        </div>

        {/* Right */}
        <p className="text-sm text-center">
          Made with ❤️ for Developers
        </p>

      </div>
    </footer>
  );
}