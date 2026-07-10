import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaMicrophone,
  FaHistory,
  FaUser,
  FaCog,
  FaComments,
  FaTrophy,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Practice", path: "/practice", icon: <FaMicrophone /> },
  { name: "History", path: "/history", icon: <FaHistory /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
  { name: "Conversation", path: "/conversation", icon: <FaComments /> },
  { name: "Leaderboard", path: "/leaderboard", icon: <FaTrophy /> },
];

function Sidebar({ closeSidebar }) {
  return (
    <aside className="h-screen w-72 bg-slate-900 border-r border-slate-800 shadow-xl">

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-3xl font-bold text-white">
          🎤 SpeakAI
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          AI English Speaking Coach
        </p>

      </div>

      <nav className="mt-6 px-4">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => closeSidebar && closeSidebar()}
            className={({ isActive }) =>
              `mb-2 flex items-center gap-4 rounded-xl px-5 py-4 font-medium transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>
    </aside>
  );
}

export default Sidebar;