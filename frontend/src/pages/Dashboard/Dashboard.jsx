import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHero from "../../components/dashboard/DashboardHero";
import StatsCards from "../../components/dashboard/StatsCards";
import ProgressChart from "../../components/dashboard/ProgressChart";
import AnimatedPage from "../../components/common/AnimatedPage";
import SkeletonCard from "../../components/common/SkeletonCard";

import {
  getDashboard,
  getDailyChallenge,
} from "../../services/api";
import Achievements from "../../components/dashboard/Achievements";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [challenge, setChallenge] = useState("");

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

  useEffect(() => {
    loadDashboard();
    loadChallenge();
  }, []);

  if (!stats) {
  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </DashboardLayout>
  );
}

  return (
    <DashboardLayout>
      <AnimatedPage>
      <DashboardHero />

      {/* Daily Challenge */}
      <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-5 shadow-xl md:mt-8 md:p-6">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          🔥 Today's Speaking Challenge
        </h2>

        <p className="mt-3 text-base text-indigo-100 md:mt-4 md:text-lg">
          {challenge || "Loading today's challenge..."}
        </p>
      </div>

      {/* Statistics */}
      <div className="mt-6 md:mt-8">
        <StatsCards stats={stats} />
      </div>

      {/* Extra Statistics */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-2">

        <div className="rounded-2xl bg-slate-900 p-5 shadow-lg">
          <h2 className="text-base text-slate-400 md:text-lg">
            🎤 Total Sessions
          </h2>

          <p className="mt-3 break-words text-3xl font-bold text-white md:mt-4 md:text-5xl">
            {stats.totalSessions}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-5 shadow-lg">
          <h2 className="text-base text-slate-400 md:text-lg">
            📖 Average Grammar
          </h2>

          <p className="mt-3 break-words text-3xl font-bold text-green-400 md:mt-4 md:text-5xl">
            {Number(stats.averageGrammar).toFixed(2)}%
          </p>
        </div>

      </div>

      {/* Progress Chart */}
      <div className="mt-6 md:mt-8">
        <ProgressChart chart={stats.chart} />
      </div>
      <Achievements />
      <QuickActions />
      </AnimatedPage>
    </DashboardLayout>
  );
}

export default Dashboard;