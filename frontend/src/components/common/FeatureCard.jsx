import { motion } from "framer-motion";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20"
    >
      <div className="mb-6 inline-flex rounded-2xl bg-indigo-600/20 p-4 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <Icon size={30} />
      </div>

      <h3 className="mb-3 text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="leading-7 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;