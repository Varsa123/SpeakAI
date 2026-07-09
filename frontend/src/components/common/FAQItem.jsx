import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-white">
          {question}
        </h3>

        <ChevronDown
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <p className="mt-4 text-slate-400 leading-7">
          {answer}
        </p>
      )}
    </div>
  );
}

export default FAQItem;