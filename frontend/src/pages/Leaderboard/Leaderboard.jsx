import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getLeaderboard } from "../../services/api";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold text-white">
        🏆 Leaderboard
      </h1>

      <div className="space-y-5">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between rounded-2xl bg-slate-900 p-5 transition hover:scale-[1.02] hover:bg-slate-800"
          >
            <div className="flex items-center gap-5">
              <div className="text-3xl">
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : `#${index + 1}`}
              </div>

              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}`
                }
                alt={user.name}
                className="h-14 w-14 rounded-full border-2 border-indigo-500 object-cover"
              />

              <div>
                <h2 className="text-xl font-semibold text-white">
                  {user.name}
                </h2>

                <p className="text-slate-400">
                  ⭐ Level {user.level}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-400">
                {user.xp} XP
              </p>

              <p className="text-orange-400">
                🔥 {user.streak} Days
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Leaderboard;