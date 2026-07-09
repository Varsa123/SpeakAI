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

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen">

      <div className="p-8">

        <h1 className="text-3xl font-bold text-white">
          🎤 SpeakAI
        </h1>

      </div>

      <nav className="px-5">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-5 py-4 mb-2 transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800"
              }`
            }
          >
            {item.icon}

            {item.name}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;