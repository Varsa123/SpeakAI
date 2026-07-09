import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 p-6">

      <div>

        <h2 className="text-3xl font-bold text-white">
          Welcome,
          {" "}
          {user?.fullName}
          👋
        </h2>

        <p className="text-slate-400">
          Keep improving your English today.
        </p>

      </div>

      <button
        onClick={logout}
        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>

    </header>
  );
}

export default Topbar;