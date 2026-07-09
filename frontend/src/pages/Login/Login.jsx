import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form);

      login(res.data.user, res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Login to continue your English journey.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;