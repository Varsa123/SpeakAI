import { Link } from "react-router-dom";

function Action({ to, title, emoji }) {
  return (
    <Link
      to={to}
      className="rounded-2xl bg-indigo-600 p-6 text-center transition hover:bg-indigo-500"
    >
      <div className="text-5xl">
        {emoji}
      </div>

      <h2 className="mt-3 text-xl font-bold text-white">
        {title}
      </h2>
    </Link>
  );
}

export default function QuickActions() {
  return (
    <div className="mt-10">
      <h2 className="mb-6 text-3xl font-bold text-white">
        🚀 Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <Action
          to="/practice"
          title="Start Practice"
          emoji="🎤"
        />

        <Action
          to="/conversation"
          title="AI Conversation"
          emoji="🤖"
        />

        <Action
          to="/history"
          title="History"
          emoji="📜"
        />
      </div>
    </div>
  );
}