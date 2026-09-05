import type { StudentWellnessInputs } from "../api/gemini";
import { 
  BookOpen, 
  Sparkles, 
  Moon, 
  BookOpenCheck, 
  HelpCircle, 
  Plus, 
  Minus,
  AlertTriangle
} from "lucide-react";

interface TrackerFormProps {
  inputs: StudentWellnessInputs;
  onChange: (inputs: Partial<StudentWellnessInputs>) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
  apiKey: string;
  setSettingsOpen: (open: boolean) => void;
}

const EXAMS = [
  { code: "JEE", label: "JEE", desc: "Engineering" },
  { code: "NEET", label: "NEET", desc: "Medical" },
  { code: "UPSC", label: "UPSC", desc: "Civil Services" },
  { code: "CAT", label: "CAT", desc: "Management" },
  { code: "GATE", label: "GATE", desc: "Post-Grad" },
  { code: "CUET", label: "CUET", desc: "University" },
  { code: "Board Exams", label: "Boards", desc: "High School" },
  { code: "Other", label: "Other", desc: "Other Exams" },
];

const MOOD_DATA: Record<number, { emoji: string; label: string; color: string; bg: string }> = {
  1: { emoji: "😩", label: "Overwhelmed / Exhausted", color: "text-rose-600", bg: "bg-rose-50" },
  2: { emoji: "😢", label: "Extremely Low / Stressed", color: "text-rose-500", bg: "bg-rose-50" },
  3: { emoji: "😰", label: "Anxious / Panicky", color: "text-orange-500", bg: "bg-orange-50" },
  4: { emoji: "😕", label: "Struggling / Doubtful", color: "text-orange-400", bg: "bg-orange-50" },
  5: { emoji: "😐", label: "Just Hanging In There", color: "text-amber-500", bg: "bg-amber-50" },
  6: { emoji: "😌", label: "Okay / Balanced", color: "text-yellow-500", bg: "bg-yellow-50" },
  7: { emoji: "🙂", label: "Productive / Steady", color: "text-lime-600", bg: "bg-lime-50" },
  8: { emoji: "😊", label: "Good Focus & Calm", color: "text-teal-600", bg: "bg-teal-50" },
  9: { emoji: "💪", label: "Confident / Motivated", color: "text-emerald-600", bg: "bg-emerald-50" },
  10: { emoji: "🌟", label: "Highly Energized", color: "text-emerald-500", bg: "bg-emerald-50" },
};

const REFLECTION_PROMPTS = [
  "What topic did I learn well today?",
  "Where did I feel stuck or lose time?",
  "Am I feeling anxious about mock tests or backlog?",
  "How did I handle stress or negative thoughts today?",
];

export default function TrackerForm({
  inputs,
  onChange,
  onSubmit,
  loading,
  error,
  apiKey,
  setSettingsOpen,
}: TrackerFormProps) {


  const handleExamSelect = (examCode: string) => {
    onChange({ examType: examCode });
  };

  const handleMoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ moodRating: parseInt(e.target.value) });
  };

  const adjustHours = (field: "hoursStudied" | "sleepHours", amount: number) => {
    const minVal = 0;
    const maxVal = field === "hoursStudied" ? 24 : 16;
    const current = inputs[field];
    const updated = Math.max(minVal, Math.min(maxVal, current + amount));
    onChange({ [field]: updated });
  };

  const handlePromptClick = (prompt: string) => {
    // Pre-fill journal if empty, or append it
    const prefix = inputs.reflectionJournal ? inputs.reflectionJournal + "\n" : "";
    onChange({ reflectionJournal: prefix + `${prompt} ` });
  };

  const currentMood = MOOD_DATA[inputs.moodRating] || MOOD_DATA[5];

  // Helper validation messages for live coaching hints
  const showSleepWarning = inputs.sleepHours < 6;
  const showStudyWarning = inputs.hoursStudied >= 12;

  return (
    <div className="w-full animate-fade-in-up">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100/50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          Log Your Daily Study & Mental State
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200/50 text-rose-800 rounded-2xl flex items-start gap-2 text-sm">
            <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Analysis Failed:</span> {error}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Exam Type Grid */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider text-left">
              1. Target Exam Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {EXAMS.map((exam) => {
                const isSelected = inputs.examType === exam.code;
                return (
                  <button
                    key={exam.code}
                    onClick={() => handleExamSelect(exam.code)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-purple-500 text-indigo-700 shadow-md shadow-indigo-100/50 font-semibold"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="text-sm">{exam.label}</span>
                    <span className="text-[10px] text-gray-500 font-normal">{exam.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mood Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="mood-slider" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                2. Mood & Energy Rating
              </label>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${currentMood.color} ${currentMood.bg} transition-all duration-300 animate-scale-up`}>
                <span className="text-lg leading-none">{currentMood.emoji}</span>
                <span>{currentMood.label} (Score: {inputs.moodRating}/10)</span>
              </div>
            </div>
            <div className="flex items-center gap-4 py-2">
              <span className="text-lg">😩</span>
              <input
                id="mood-slider"
                type="range"
                min="1"
                max="10"
                value={inputs.moodRating}
                onChange={handleMoodChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />
              <span className="text-lg">🌟</span>
            </div>
          </div>

          {/* Study & Sleep Hours (Dual Counter Card) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Study Hours */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center relative">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <BookOpenCheck className="h-4 w-4 text-indigo-500" />
                Hours Studied Today
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => adjustHours("hoursStudied", -0.5)}
                  className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-600 active:scale-95 transition-all cursor-pointer"
                  aria-label="Decrease study hours"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-3xl font-extrabold text-gray-900 w-16 text-center tracking-tight">
                  {inputs.hoursStudied}
                </span>
                <button
                  onClick={() => adjustHours("hoursStudied", 0.5)}
                  className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-600 active:scale-95 transition-all cursor-pointer"
                  aria-label="Increase study hours"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {showStudyWarning && (
                <div className="mt-2 text-[10px] text-amber-600 flex items-center gap-1 text-center font-medium">
                  <AlertTriangle className="h-3 w-3 inline" />
                  Studying &gt;= 12 hrs risks rapid burnout
                </div>
              )}
            </div>

            {/* Sleep Hours */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center relative">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <Moon className="h-4 w-4 text-purple-500" />
                Sleep Last Night
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => adjustHours("sleepHours", -0.5)}
                  className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-600 active:scale-95 transition-all cursor-pointer"
                  aria-label="Decrease sleep hours"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-3xl font-extrabold text-gray-900 w-16 text-center tracking-tight">
                  {inputs.sleepHours}
                </span>
                <button
                  onClick={() => adjustHours("sleepHours", 0.5)}
                  className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-600 active:scale-95 transition-all cursor-pointer"
                  aria-label="Increase sleep hours"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {showSleepWarning && (
                <div className="mt-2 text-[10px] text-rose-500 flex items-center gap-1 text-center font-semibold animate-pulse">
                  <AlertTriangle className="h-3 w-3 inline" />
                  Under 6 hrs sleep limits focus capacity
                </div>
              )}
            </div>
          </div>

          {/* Reflection Journal */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="journal-textarea" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                4. Reflection Journal
              </label>
              <div className="text-xs text-gray-400 font-medium">Be candid. Talk about struggles & wins.</div>
            </div>
            <textarea
              id="journal-textarea"
              rows={4}
              value={inputs.reflectionJournal}
              onChange={(e) => onChange({ reflectionJournal: e.target.value })}
              placeholder="How are you feeling about your progress? Describe mock test results, syllabus speed, doubts, family pressure, or any small achievement..."
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white/50 backdrop-blur-sm placeholder:text-gray-400"
            />
            
            {/* Click-to-add Writing Prompts */}
            <div className="mt-3">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 mb-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
                Stuck on what to write? Click a prompt to guide you:
              </span>
              <div className="flex flex-wrap gap-2">
                {REFLECTION_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptClick(prompt)}
                    className="text-[11px] bg-purple-50 hover:bg-purple-100 text-purple-700 px-2.5 py-1.5 rounded-xl border border-purple-200/40 font-medium transition-colors cursor-pointer text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 border-t border-gray-100 flex flex-col items-center">
            {!apiKey ? (
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Configure Gemini API Key to Analyze
              </button>
            ) : (
              <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Aura AI is evaluating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 text-purple-200" />
                    Analyze My Wellness
                  </>
                )}
              </button>
            )}
            <p className="text-[10px] text-gray-400 mt-2">Powered by Er. Pankaj Kumar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
