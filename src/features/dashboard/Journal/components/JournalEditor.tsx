import dayjs from "dayjs";
import CtaButtons from "../../../../components/buttons/CtaButtons";
import CardUi from "../../Home/component/CardUi";
import { LuNotebookPen } from "react-icons/lu";

type JournalEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onAnalyze: () => void;
  isSaving: boolean;
  isAnalyzing: boolean;
};

const JournalEditor = ({
  value,
  onChange,
  onSave,
  onAnalyze,
  isSaving,
  isAnalyzing,
}: JournalEditorProps) => {
  const today = dayjs().format("dddd, MMMM D, YYYY");
  const isBusy = isSaving || isAnalyzing;
  const canSubmit = value.trim().length > 0 && !isBusy;

  return (
    <CardUi className="h-full">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="rounded-full bg-primaryblue-300 p-3 text-lg text-white">
              <LuNotebookPen />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-[#1E293B]">
                Today&apos;s Entry
              </h2>
              <p className="text-sm font-light text-gray-500">{today}</p>
            </div>
          </div>
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Today I worked on my portfolio but got stuck deploying..."
          rows={12}
          className="w-full resize-none rounded-xl border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm font-light text-[#1E293B] outline-none placeholder:text-black/30 focus:border-primaryblue-300"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light text-gray-400">
            {value.trim().length} characters
          </p>

          <div className="flex flex-row justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                if (!canSubmit) return;
                onSave();
              }}
              className={`flex items-center rounded-full border border-gray-400 px-4 py-2 text-sm transition-all duration-200 hover:border-none hover:bg-gray-200 ${
                !canSubmit ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              }`}
            >
              {isSaving ? "Saving..." : "Save Entry"}
            </button>

            <CtaButtons
              onClick={() => {
                if (!canSubmit) return;
                onAnalyze();
              }}
              className={`px-5 py-2 ${!canSubmit ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <p>{isAnalyzing ? "Analyzing..." : "Analyze with AI"}</p>
            </CtaButtons>
          </div>
        </div>
      </div>
    </CardUi>
  );
};

export default JournalEditor;
