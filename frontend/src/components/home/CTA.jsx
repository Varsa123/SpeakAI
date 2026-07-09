import { ArrowRight } from "lucide-react";
import Button from "../common/Button";

function CTA() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="mx-auto max-w-5xl rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 p-12 text-center">

        <h2 className="text-4xl font-bold text-white">
          Ready to Improve Your English?
        </h2>

        <p className="mt-6 text-slate-300 text-lg">
          Join thousands of learners using AI to speak English confidently.
        </p>

        <div className="mt-10 flex justify-center">
          <Button>
            Get Started Free
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;