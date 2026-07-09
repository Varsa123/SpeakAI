import {
  Mic,
  Brain,
  MessageCircle,
  TrendingUp,
  Languages,
  Trophy,
} from "lucide-react";

import SectionTitle from "../common/SectionTitle";
import FeatureCard from "../common/FeatureCard";

function Features() {
  const features = [
    {
      icon: Mic,
      title: "AI Speaking Practice",
      description:
        "Practice English naturally with your AI speaking partner anytime.",
    },
    {
      icon: Brain,
      title: "Instant Grammar Feedback",
      description:
        "Receive smart grammar corrections and suggestions instantly.",
    },
    {
      icon: MessageCircle,
      title: "Real Conversations",
      description:
        "Talk about everyday topics with realistic AI conversations.",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description:
        "Monitor your fluency, pronunciation, and vocabulary improvements.",
    },
    {
      icon: Languages,
      title: "Vocabulary Builder",
      description:
        "Learn new words in context and improve your communication skills.",
    },
    {
      icon: Trophy,
      title: "Daily Challenges",
      description:
        "Stay motivated with speaking streaks and daily AI challenges.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Everything You Need to Speak Confidently"
          subtitle="Powerful AI features designed to improve your English every day."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;