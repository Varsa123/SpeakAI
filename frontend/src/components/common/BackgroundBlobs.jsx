import { motion } from "framer-motion";

function BackgroundBlobs() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="
          absolute
          -left-40
          -top-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-indigo-500/40
          blur-[140px]
        "
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="
          absolute
          -bottom-40
          -right-40
          h-[600px]
          w-[600px]
          rounded-full
          bg-cyan-400/40
          blur-[160px]
        "
      />
    </>
  );
}

export default BackgroundBlobs;