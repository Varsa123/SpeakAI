import { motion } from "framer-motion";

function FloatingBadge({ text }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      className="rounded-full border border-indigo-500/30 bg-slate-900 px-4 py-2 text-sm text-indigo-300 shadow-lg"
    >
      {text}
    </motion.div>
  );
}

export default FloatingBadge;