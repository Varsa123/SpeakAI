import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          🎤 SpeakAI
        </Link>

        {/* Desktop Links */}

        <div className="hidden items-center gap-8 text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#testimonials"
            className="transition hover:text-white"
          >
            Reviews
          </a>
        </div>

        {/* Desktop Buttons */}

        <div className="hidden items-center gap-3 md:flex">

          {user ? (
            <>
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>

              <Button
                variant="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button>
                  Get Started
                </Button>
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="space-y-5 border-t border-slate-800 bg-slate-900 px-6 py-6 md:hidden">

          <a
            href="#features"
            onClick={() => setOpen(false)}
            className="block text-slate-300"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            onClick={() => setOpen(false)}
            className="block text-slate-300"
          >
            How It Works
          </a>

          <a
            href="#testimonials"
            onClick={() => setOpen(false)}
            className="block text-slate-300"
          >
            Reviews
          </a>

          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
              >
                <Button className="w-full">
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
              >
                <Button
                  variant="secondary"
                  className="w-full"
                >
                  Login
                </Button>
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
              >
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;