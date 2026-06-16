import { FaRobot } from "react-icons/fa";
import { MdSummarize, MdOutlineNextPlan, MdTrendingUp } from "react-icons/md";
import AiInsightCard from "./AiInsightCard";

type AiInsightsSectionProps = {
  isAnalyzing: boolean;
  showInsights: boolean;
  hasEntry: boolean;
};

const placeholderSummary =
  "Write your journal entry and click Analyze with AI to get a summary of your day.";

const placeholderPriorities =
  "AI will suggest focused priorities for tomorrow based on what you wrote today.";

const placeholderPatterns =
  "Productivity patterns will appear here once AI analyzes your journal history.";

const mockSummary =
  "You spent most of the day on your portfolio, with a strong focus on building and refining your work. Deployment became the main blocker and slowed your momentum in the afternoon.";

const mockPriorities = [
  "Review deployment logs and fix the hosting configuration issue.",
  "Break tomorrow's portfolio work into a deploy checklist before coding.",
  "Schedule a 25-minute focused block early in the day for deployment tasks.",
];

const mockPatterns = [
  "You tend to make solid progress on creative work before hitting technical blockers.",
  "Deployment and integration tasks often appear at the end of your sessions.",
  "Consider separating build days from deploy days to maintain flow.",
];

const AiInsightsSection = ({
  isAnalyzing,
  showInsights,
  hasEntry,
}: AiInsightsSectionProps) => {
  const useMockData = showInsights && hasEntry;

  return (
    <section className="flex flex-col space-y-5">
      <div className="flex items-center space-x-3">
        <span className="rounded-full bg-[#009781] p-2 text-white">
          <FaRobot className="text-lg" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-[#1E293B]">AI Insights</h2>
          <p className="text-sm font-light text-gray-500">
            Summaries, priorities, and patterns from your journal
          </p>
        </div>
      </div>

      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center space-y-3 rounded-2xl bg-white px-6 py-12 shadow-sm">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-primaryblue-300 border-t-transparent" />
          <p className="text-sm font-light text-gray-500">Analyzing your journal...</p>
        </div>
      )}

      {!isAnalyzing && (
        <div className="grid grid-cols-1 gap-4">
          <AiInsightCard
            icon={<MdSummarize />}
            iconBgColor="bg-[#882FFB]"
            title="Summarize the Day"
            description="A quick recap of what you accomplished and where you got stuck"
          >
            {useMockData ? mockSummary : placeholderSummary}
          </AiInsightCard>

          <AiInsightCard
            icon={<MdOutlineNextPlan />}
            iconBgColor="bg-[#00977C]"
            title="Tomorrow's Priorities"
            description="Suggested focus areas to keep momentum going"
          >
            {useMockData ? (
              <ul className="list-disc space-y-2 pl-4">
                {mockPriorities.map((priority) => (
                  <li key={priority}>{priority}</li>
                ))}
              </ul>
            ) : (
              placeholderPriorities
            )}
          </AiInsightCard>

          <AiInsightCard
            icon={<MdTrendingUp />}
            iconBgColor="bg-[#BD29BA]"
            title="Productivity Patterns"
            description="Trends AI notices across your recent entries"
          >
            {useMockData ? (
              <ul className="list-disc space-y-2 pl-4">
                {mockPatterns.map((pattern) => (
                  <li key={pattern}>{pattern}</li>
                ))}
              </ul>
            ) : (
              placeholderPatterns
            )}
          </AiInsightCard>
        </div>
      )}
    </section>
  );
};

export default AiInsightsSection;
