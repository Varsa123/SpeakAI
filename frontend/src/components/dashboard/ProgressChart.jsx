import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ProgressChart({ chart }) {
  return (
    <div className="mt-8 rounded-2xl bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Weekly Progress
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="grammar"
            stroke="#6366f1"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressChart;