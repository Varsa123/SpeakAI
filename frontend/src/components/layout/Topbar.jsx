import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="hidden md:flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">

      <div>

        <h2 className="text-3xl font-bold text-white">
          Welcome, {user?.name || "Learner"} 👋
        </h2>

        <p className="text-slate-400">
          Keep improving your English today.
        </p>

      </div>

      <button
        onClick={logout}
        className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
      >
        Logout
      </button>

    </header>
  );
}

export default Topbar;