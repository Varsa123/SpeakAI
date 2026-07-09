import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
function DashboardHero() {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 p-8">

      <h1 className="text-4xl font-bold text-white">
        Welcome back,
        {" "}
        {user?.fullName}
        👋
      </h1>

      <p className="mt-4 text-indigo-100">
        Keep practicing every day to improve your English.
      </p>
      <Link
  to="/leaderboard"
  className="mt-5 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
>
  🏆 View Leaderboard
</Link>

    </div>
  );
}

export default DashboardHero;