import DashboardLayout from "../../components/layout/DashboardLayout";
import PracticeHeader from "../../components/practice/PracticeHeader";
import Recorder from "../../components/practice/Recorder";
import ScoreCard from "../../components/practice/ScoreCard";
import FeedbackCard from "../../components/practice/FeedbackCard";

function Practice() {
  return (
    <DashboardLayout>
      <PracticeHeader />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        {/* Left Side */}
        <div>
          <Recorder />
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <ScoreCard />
          <FeedbackCard />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Practice;