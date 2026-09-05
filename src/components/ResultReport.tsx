import { useState } from "react";
import type { WellnessAnalysisResponse } from "../api/gemini";
import { 
  CheckCircle, 
  AlertOctagon, 
  Sparkles, 
  ListTodo, 
  RefreshCw, 
  Heart, 
  Flame, 
  TrendingUp, 
  ChevronRight, 
  Award,
  UserCheck
} from "lucide-react";

interface ResultReportProps {
  result: WellnessAnalysisResponse;
  onReset: () => void;
  examType: string;
}

export default function ResultReport({ result, onReset, examType }: ResultReportProps) {
  const [goalCompleted, setGoalCompleted] = useState(false);

  // Derive score colors
  const getScoreInfo = (score: number) => {
    if (score < 50) {
      return {
        text: "text-rose-600",
        border: "border-rose-200",
        bg: "bg-rose-50",
        ring: "stroke-rose-500",
        label: "Burnout Risk / High Stress",
        advice: "Your score indicates significant pressure or low recovery. Prioritize rest today."
      };
    } else if (score < 75) {
      return {
        text: "text-amber-600",
        border: "border-amber-200",
        bg: "bg-amber-50/50",
        ring: "stroke-amber-500",
        label: "Moderate Stress",
        advice: "You are maintaining study hours, but stress levels are elevated. Tweak your recovery pacing."
      };
    } else {
      return {
        text: "text-emerald-600",
        border: "border-emerald-200",
        bg: "bg-emerald-50/50",
        ring: "stroke-emerald-500",
        label: "Optimal Mindspace",
        advice: "Excellent balance of focus, sleep, and mindset. Maintain this routine."
      };
    }
  };

  const scoreInfo = getScoreInfo(result.wellnessScore);
  const strokeDashoffset = 251.2 - (251.2 * result.wellnessScore) / 100;

  return (
    <div className="w-full space-y-6 animate-scale-up">
      {/* Back button and quick title */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          Daily Analysis Report &bull; {examType} Focus
        </h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shadow-sm cursor-pointer hover:shadow"
        >
          <RefreshCw className="h-3 w-3" />
          Log New Entry
        </button>
      </div>

      {/* Main Grid: Score Gauge and Primary Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Ring Card */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden md:col-span-1">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Heart className="h-32 w-32 text-indigo-500" />
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Wellness Index
          </span>
          
          {/* Radial Indicator */}
          <div className="relative flex items-center justify-center h-36 w-36 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="40"
                className="stroke-gray-100"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="40"
                className={`${scoreInfo.ring} transition-all duration-1000 ease-out`}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl font-extrabold tracking-tight ${scoreInfo.text}`}>
                {result.wellnessScore}
              </span>
              <span className="text-[10px] text-gray-400 font-medium uppercase">Out of 100</span>
            </div>
          </div>

          <h4 className={`text-sm font-bold ${scoreInfo.text} mb-1 uppercase tracking-wide`}>
            {scoreInfo.label}
          </h4>
          <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
            {scoreInfo.advice}
          </p>
        </div>

        {/* Primary Emotion & AI Motivator */}
        <div className="glass-panel rounded-3xl p-6 md:col-span-2 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 h-36 w-36 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-full blur-2xl"></div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Dominant Mental State
              </span>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-wide">
                Detected
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {result.primaryEmotion}
              </h3>
            </div>

            {/* Motivation Message Blockquote */}
            <div className="relative pl-6 py-1 border-l-2 border-indigo-500 bg-gradient-to-r from-indigo-50/20 to-transparent rounded-r-xl">
              <span className="absolute left-1.5 top-0 text-3xl text-indigo-400 font-serif leading-none select-none">“</span>
              <p className="text-sm font-medium text-gray-700 italic leading-relaxed">
                {result.motivationMessage}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <UserCheck className="h-4 w-4 text-emerald-500" />
              Aura Advisor Exam Coaching
            </div>
            <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-semibold">
              Empathetic Core
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side: Stress Triggers vs Positive Observations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stress Triggers */}
        <div className="glass-panel rounded-3xl p-6 border-t-4 border-t-amber-400">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-4 uppercase tracking-wider">
            <AlertOctagon className="h-4.5 w-4.5 text-amber-500" />
            Identified Stress Triggers
          </h4>
          {result.stressTriggers.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No critical stressors detected in today's logs.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {result.stressTriggers.map((trigger, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/40"
                >
                  <Flame className="h-3 w-3 text-amber-600" />
                  {trigger}
                </span>
              ))}
            </div>
          )}
          <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
            These represent variables eating into your emotional bandwidth. Resolving these triggers unlocks focus.
          </p>
        </div>

        {/* Positive Observations */}
        <div className="glass-panel rounded-3xl p-6 border-t-4 border-t-emerald-400">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-4 uppercase tracking-wider">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
            Positive Mindsets & Strengths
          </h4>
          {result.positiveObservations.length === 0 ? (
            <p className="text-xs text-gray-500 italic">Be proud: continue writing details to unlock observations.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {result.positiveObservations.map((obs, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/40"
                >
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {obs}
                </span>
              ))}
            </div>
          )}
          <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
            Your strengths protect against academic fatigue. Acknowledge and reinforce these achievements.
          </p>
        </div>
      </div>

      {/* Wellness Recommendations */}
      <div className="glass-panel rounded-3xl p-6">
        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-4 uppercase tracking-wider">
          <Sparkles className="h-4.5 w-4.5 text-purple-500" />
          Personalized Mental Wellness Actions
        </h4>
        <ul className="space-y-3.5">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
              <span className="text-xs text-gray-700 leading-relaxed font-medium">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tomorrow Goal Checklist */}
      <div className="glass-panel rounded-3xl p-6 bg-gradient-to-br from-indigo-50/20 via-purple-50/20 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ListTodo className="h-24 w-24 text-indigo-600" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 uppercase tracking-wider">
              <ListTodo className="h-4.5 w-4.5 text-indigo-600" />
              Empathetic Tomorrow Micro-Goal
            </h4>
            <p className="text-xs text-gray-500">
              Complete this small action tomorrow to maintain positive momentum.
            </p>
          </div>

          <button
            onClick={() => setGoalCompleted(!goalCompleted)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
              goalCompleted
                ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/10"
                : "bg-white border-indigo-200 text-indigo-700 hover:border-indigo-300"
            }`}
          >
            {goalCompleted ? (
              <>
                <Award className="h-4 w-4" />
                Goal Completed!
              </>
            ) : (
              "Mark as Completed"
            )}
          </button>
        </div>

        <div className={`mt-5 p-4 rounded-2xl border transition-all duration-300 ${
          goalCompleted 
            ? "bg-emerald-50/30 border-emerald-200/50 line-through text-gray-400" 
            : "bg-white border-indigo-100 text-indigo-950 shadow-sm"
        }`}>
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${goalCompleted ? "bg-emerald-500" : "bg-indigo-600"}`}></span>
            <p className="text-xs font-semibold">{result.tomorrowGoal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
