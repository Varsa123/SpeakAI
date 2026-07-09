import { Mic, Brain, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import SectionTitle from "../common/SectionTitle";
import StepCard from "../common/StepCard";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Start Speaking",
      description:
        "Press the microphone button and start speaking naturally with SpeakAI.",
      icon: Mic,
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our AI analyzes your grammar, pronunciation, vocabulary, and fluency in real time.",
      icon: Brain,
    },
    {
      number: "03",
      title: "Improve Daily",
      description:
        "Receive personalized feedback, track your progress, and become a confident English speaker.",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="How SpeakAI Works"
          subtitle="Improve your English speaking in just three simple steps."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
            >
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;