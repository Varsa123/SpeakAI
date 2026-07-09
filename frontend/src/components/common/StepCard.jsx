import { motion } from "framer-motion";

function StepCard({ number, title, description, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center transition-all duration-300"
    >
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
        {number}
      </div>

      <div className="mb-5 flex justify-center text-indigo-400">
        <Icon size={36} />
      </div>

      <h3 className="mb-3 text-2xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}

export default StepCard;