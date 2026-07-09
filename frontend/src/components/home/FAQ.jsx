import SectionTitle from "../common/SectionTitle";
import FAQItem from "../common/FAQItem";

function FAQ() {
  const faqs = [
    {
      question: "Is SpeakAI free to use?",
      answer:
        "Yes. We'll offer a free plan with daily speaking practice and AI feedback.",
    },
    {
      question: "Can I practice every day?",
      answer:
        "Absolutely. SpeakAI is designed to encourage daily speaking practice with personalized feedback.",
    },
    {
      question: "Will my speaking history be saved?",
      answer:
        "Yes. After logging in, your speaking sessions and progress will be stored securely.",
    },
    {
      question: "Does SpeakAI correct grammar and pronunciation?",
      answer:
        "Yes. The AI analyzes grammar, pronunciation, fluency, and vocabulary to help you improve.",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about SpeakAI."
        />

        <div className="mt-10">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;