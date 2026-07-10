import { motion } from "framer-motion";
import { ArrowRight, Mic, Play, Sparkles } from "lucide-react";

import Button from "../common/Button";
import BackgroundBlobs from "../common/BackgroundBlobs";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Hero() {
  const { user } = useAuth();
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <BackgroundBlobs />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-5 py-16 lg:min-h-[90vh] lg:flex-row lg:justify-between lg:gap-16 lg:px-6 lg:py-24">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center lg:text-left"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <Sparkles size={18} />
            AI Powered English Coach
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Master English
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-lg leading-8 text-slate-400">
            Practice speaking naturally, improve pronunciation, receive instant
            AI feedback, and become a confident English speaker.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">

  <Link to={user ? "/dashboard" : "/register"}>
    <Button>
      Start Free
      <ArrowRight size={18} />
    </Button>
  </Link>

  <Link to="/conversation">
    <Button variant="secondary">
      <Play size={18} />
      Watch Demo
    </Button>
  </Link>

</div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start">
            <div>
              <h2 className="text-3xl font-bold text-indigo-400">10K+</h2>
              <p className="text-slate-400">Practice Sessions</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-indigo-400">2.5K+</h2>
              <p className="text-slate-400">Learners</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-indigo-400">4.9★</h2>
              <p className="text-slate-400">User Rating</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-sm lg:max-w-md"
        >
          {/* Floating Card 1 */}
          hidden lg:block
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -left-10 top-6 hidden rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 backdrop-blur lg:block"
          >
            <p className="text-sm text-slate-300">Grammar</p>
            <p className="font-bold text-green-400">96%</p>
          </motion.div>

          {/* Floating Card 2 */}
          hidden lg:block
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-10 top-24 hidden rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 backdrop-blur lg:block"
          >
            <p className="text-sm text-slate-300">Fluency</p>
            <p className="font-bold text-cyan-400">91%</p>
          </motion.div>

          {/* Floating Card 3 */}
          hidden lg:block
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute left-10 -bottom-6 hidden rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 backdrop-blur lg:block"
          >
            <p className="text-sm text-slate-300">Vocabulary</p>
            <p className="font-bold text-indigo-400">94%</p>
          </motion.div>

          {/* Main AI Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600">
                <Mic size={30} />
              </div>

              <div>
                <h3 className="text-xl font-bold">AI Voice Assistant</h3>
                <p className="text-slate-400">Listening...</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-950 p-5">
              <p className="leading-8 text-slate-300">
                "Hello, my name is Varsa. I want to improve my English speaking
                every day."
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Pronunciation</span>
                  <span>92%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700">
                  <div className="h-2 w-[92%] rounded-full bg-green-400"></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Grammar</span>
                  <span>96%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700">
                  <div className="h-2 w-[96%] rounded-full bg-indigo-500"></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Fluency</span>
                  <span>91%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700">
                  <div className="h-2 w-[91%] rounded-full bg-cyan-400"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5">
              <h4 className="mb-2 font-semibold text-indigo-300">
                AI Feedback
              </h4>

              <p className="text-slate-300">
                Excellent confidence! Try slowing down slightly to improve your
                pronunciation even more.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;