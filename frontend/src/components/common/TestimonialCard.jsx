import { motion } from "framer-motion";
import { Star } from "lucide-react";

function TestimonialCard({ name, role, review }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg"
    >
      <div className="mb-4 flex gap-1 text-yellow-400">
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={18} fill="currentColor" />
        ))}
      </div>

      <p className="mb-6 leading-7 text-slate-300">
        "{review}"
      </p>

      <div>
        <h4 className="font-semibold text-white">{name}</h4>
        <p className="text-sm text-slate-400">{role}</p>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;