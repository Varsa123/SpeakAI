import SectionTitle from "../common/SectionTitle";
import TestimonialCard from "../common/TestimonialCard";

function Testimonials() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Engineering Student",
      review:
        "SpeakAI helped me become more confident during interviews. The AI feedback is incredibly useful.",
    },
    {
      name: "Priya Verma",
      role: "Software Developer",
      review:
        "I practice every morning. My pronunciation and fluency have improved a lot in just a few weeks.",
    },
    {
      name: "Rahul Mehta",
      role: "MBA Aspirant",
      review:
        "The conversation practice feels natural. It's much better than memorizing grammar rules.",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Loved by Learners"
          subtitle="Here's what our early users have to say about SpeakAI."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              review={testimonial.review}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;