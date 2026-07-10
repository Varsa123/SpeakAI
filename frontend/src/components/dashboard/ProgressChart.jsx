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
    <div className="mt-8 rounded-3xl bg-slate-900 p-5 shadow-lg sm:p-6">

      <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl">
        📈 Weekly Progress
      </h2>

      <div className="h-[280px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chart}
            margin={{
              top: 10,
              right: 15,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              domain={[0, 100]}
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="grammar"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ProgressChart;