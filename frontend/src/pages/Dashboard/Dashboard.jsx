import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHero from "../../components/dashboard/DashboardHero";
import StatsCards from "../../components/dashboard/StatsCards";
import ProgressChart from "../../components/dashboard/ProgressChart";
import {
  getDashboard,
  getDailyChallenge,
} from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [challenge, setChallenge] = useState("");

  useEffect(() => {
    loadDashboard();
    loadChallenge();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadChallenge = async () => {
    try {
      const res = await getDailyChallenge();
      setChallenge(res.challenge);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <DashboardHero />

      {/* Daily Challenge */}

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white">
          🔥 Today's Speaking Challenge
        </h2>

        <p className="mt-4 text-lg text-indigo-100">
          {challenge || "Loading today's challenge..."}
        </p>
      </div>

      {stats && (
        <>
          <div className="mt-8">
            <StatsCards stats={stats} />
          </div>

          {/* Extra Statistics */}

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
              <h2 className="text-lg text-slate-400">
                🎤 Total Sessions
              </h2>

              <p className="mt-4 text-5xl font-bold text-white">
                {stats.totalSessions}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
              <h2 className="text-lg text-slate-400">
                📖 Average Grammar
              </h2>

              <p className="mt-4 text-5xl font-bold text-green-400">
                {stats.averageGrammar}%
              </p>
            </div>
          </div>

          {/* Progress Chart */}

          <div className="mt-8">
            <ProgressChart chart={stats.chart} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;