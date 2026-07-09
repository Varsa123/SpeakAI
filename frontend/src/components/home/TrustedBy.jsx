import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import StatsCard from "../common/StatsCard";

function TrustedBy() {
  const stats = [
    {
      value: "10K+",
      label: "Practice Sessions",
    },
    {
      value: "2.5K+",
      label: "Active Learners",
    },
    {
      value: "15+",
      label: "Countries",
    },
    {
      value: "4.9★",
      label: "User Rating",
    },
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Trusted by Learners Worldwide"
          subtitle="Thousands of learners use SpeakAI to improve their English speaking confidence every day."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <StatsCard
                value={stat.value}
                label={stat.label}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;