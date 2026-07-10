import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function DashboardHero() {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6 shadow-xl sm:p-8">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Welcome back,
            <span className="block text-yellow-300">
              {user?.name || "Learner"} 👋
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-indigo-100">
            Keep practicing every day to improve your English speaking,
            pronunciation, and confidence.
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-4">

          <Link
            to="/practice"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:scale-105"
          >
            🎤 Start Practice
          </Link>

          <Link
            to="/leaderboard"
            className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-105"
          >
            🏆 Leaderboard
          </Link>

        </div>

      </div>

    </div>
  );
}

export default DashboardHero;