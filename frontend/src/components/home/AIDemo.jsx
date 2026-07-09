import { Mic, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import SectionTitle from "../common/SectionTitle";
import ScoreCard from "../common/ScoreCard";

function AIDemo() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Experience SpeakAI"
          subtitle="A preview of the feedback you'll receive after every speaking session."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Demo Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-full bg-indigo-600 p-3 text-white">
                <Mic size={24} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Listening...
                </h3>

                <p className="text-slate-400">
                  AI is analyzing your speech.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-6">
              <p className="leading-8 text-slate-300">
                Hello, my name is Varsa.
                I enjoy improving my English speaking every day using SpeakAI.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">
              <div className="mb-4 flex items-center gap-2 text-indigo-300">
                <Sparkles size={20} />
                <span className="font-semibold">AI Feedback</span>
              </div>

              <p className="text-slate-300">
                Excellent confidence! Try slowing down slightly to improve pronunciation even more.
              </p>
            </div>
          </motion.div>

          {/* Scores */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <ScoreCard title="Pronunciation" score={92} />
            <ScoreCard title="Grammar" score={96} />
            <ScoreCard title="Fluency" score={91} />
            <ScoreCard title="Vocabulary" score={94} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AIDemo;