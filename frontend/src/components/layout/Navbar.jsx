import { Link } from "react-router-dom";
import Button from "../common/Button";

function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-white">
          🎤 SpeakAI
        </Link>

        <div className="hidden md:flex items-center gap-8 text-slate-300">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-white transition">
            How It Works
          </a>

          <a href="#testimonials" className="hover:text-white transition">
            Reviews
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>

          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;