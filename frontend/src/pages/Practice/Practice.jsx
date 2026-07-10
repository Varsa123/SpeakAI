import DashboardLayout from "../../components/layout/DashboardLayout";
import PracticeHeader from "../../components/practice/PracticeHeader";
import Recorder from "../../components/practice/Recorder";
import ScoreCard from "../../components/practice/ScoreCard";
import FeedbackCard from "../../components/practice/FeedbackCard";
import AnimatedPage from "../../components/common/AnimatedPage";

function Practice() {
  return (
    <DashboardLayout>

      <AnimatedPage>
        <PracticeHeader />

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">

        {/* Recorder */}

        <section className="w-full">
          <Recorder />
        </section>

        {/* Analysis */}

        <section className="space-y-6">
          <ScoreCard />
          <FeedbackCard />
        </section>

      </div>
      </AnimatedPage>
    </DashboardLayout>
  );
}

export default Practice;