import type { HistoryEntry } from "../hooks/useWellnessTracker";
import { 
  BarChart3, 
  Trash2, 
  Sparkles, 
  Clock, 
  Moon, 
  Activity, 
  TrendingUp, 
  Calendar,
  AlertCircle
} from "lucide-react";

interface HistoryDashboardProps {
  history: HistoryEntry[];
  onSelectEntry: (entry: HistoryEntry) => void;
  onDeleteEntry: (id: string) => void;
  onClearHistory: () => void;
  loadMockHistory: () => void;
}

export default function HistoryDashboard({
  history,
  onSelectEntry,
  onDeleteEntry,
  onClearHistory,
  loadMockHistory,
}: HistoryDashboardProps) {
  
  if (history.length === 0) {
    return (
      <div className="w-full text-center py-12 px-6 glass-panel rounded-3xl animate-fade-in-up border border-purple-100/50">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mx-auto mb-4">
          <Activity className="h-8 w-8 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No Wellness Logs Found</h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
          Start logging your daily exam mood, study stats, and thoughts on the "Daily Log" tab to compile wellness logs.
        </p>
        <button
          onClick={loadMockHistory}
          className="inline-flex items-center gap-1.5 px-5 py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          Populate Demo Student Journey
        </button>
      </div>
    );
  }

  // Calculate Metrics Averages
  const totalEntries = history.length;
  const avgWellness = Math.round(
    history.reduce((sum, entry) => sum + entry.result.wellnessScore, 0) / totalEntries
  );
  const avgStudy = parseFloat(
    (history.reduce((sum, entry) => sum + entry.inputs.hoursStudied, 0) / totalEntries).toFixed(1)
  );
  const avgSleep = parseFloat(
    (history.reduce((sum, entry) => sum + entry.inputs.sleepHours, 0) / totalEntries).toFixed(1)
  );

  // Parse chronological entries for SVG trend graph (limit to last 10 entries)
  const chartEntries = [...history].slice(0, 10).reverse();
  
  // Construct coordinates for SVG Line Chart
  const svgWidth = 500;
  const svgHeight = 160;
  const padding = 20;
  const chartWidth = svgWidth - padding * 2;
  const chartHeight = svgHeight - padding * 2;
  
  let pointsStr = "";
  if (chartEntries.length > 1) {
    pointsStr = chartEntries
      .map((entry, index) => {
        const x = padding + (index * chartWidth) / (chartEntries.length - 1);
        // Map 0-100 score to height (0 at bottom, 100 at top)
        const y = padding + chartHeight - (entry.result.wellnessScore * chartHeight) / 100;
        return `${x},${y}`;
      })
      .join(" ");
  }

  return (
    <div className="w-full space-y-6 animate-fade-in-up">
      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Checks */}
        <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Entries</div>
            <div className="text-xl font-extrabold text-gray-900">{totalEntries} Days</div>
          </div>
        </div>

        {/* Avg Wellness */}
        <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Avg Index</div>
            <div className="text-xl font-extrabold text-purple-700">{avgWellness}/100</div>
          </div>
        </div>

        {/* Avg Study */}
        <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Avg Study</div>
            <div className="text-xl font-extrabold text-blue-700">{avgStudy}h/day</div>
          </div>
        </div>

        {/* Avg Sleep */}
        <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Moon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Avg Sleep</div>
            <div className="text-xl font-extrabold text-emerald-700">{avgSleep}h/day</div>
          </div>
        </div>
      </div>

      {/* Wellness Index Trend (SVG line chart) */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-4 uppercase tracking-wider">
          <BarChart3 className="h-4.5 w-4.5 text-indigo-600" />
          Mental Wellness Score Trend
        </h4>

        {chartEntries.length < 2 ? (
          <div className="h-[160px] flex items-center justify-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Need at least 2 entries to construct trend chart.
            </p>
          </div>
        ) : (
          <div className="relative w-full h-[180px] bg-white border border-gray-100 rounded-2xl p-2 flex flex-col justify-between">
            {/* Chart Graphic Area */}
            <div className="w-full flex-grow relative">
              {/* SVG container */}
              <svg className="w-full h-full" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4" />
                <line x1={padding} y1={padding + chartHeight/2} x2={svgWidth - padding} y2={padding + chartHeight/2} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4" />
                <line x1={padding} y1={padding + chartHeight} x2={svgWidth - padding} y2={padding + chartHeight} stroke="#e5e7eb" strokeWidth="1.5" />

                {/* Y-Axis Guideline Labels */}
                <text x={padding - 5} y={padding + 4} textAnchor="end" fontSize="8" fill="#9ca3af" fontWeight="bold">100</text>
                <text x={padding - 5} y={padding + chartHeight/2 + 3} textAnchor="end" fontSize="8" fill="#9ca3af" fontWeight="bold">50</text>
                <text x={padding - 5} y={padding + chartHeight + 2} textAnchor="end" fontSize="8" fill="#9ca3af" fontWeight="bold">0</text>

                {/* Gradient Fill under Path */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M ${padding},${padding + chartHeight} L ${pointsStr} L ${padding + chartWidth},${padding + chartHeight} Z`}
                  fill="url(#chartGradient)"
                />

                {/* Main Trend Line */}
                <polyline
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3.5"
                  points={pointsStr}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>

                {/* Dots on coordinate nodes */}
                {chartEntries.map((entry, index) => {
                  const x = padding + (index * chartWidth) / (chartEntries.length - 1);
                  const y = padding + chartHeight - (entry.result.wellnessScore * chartHeight) / 100;
                  return (
                    <g key={index} className="group cursor-pointer">
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        className="fill-white stroke-purple-600 stroke-2 hover:r-7 transition-all"
                      />
                      <title>
                        Date: {new Date(entry.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}&#13;
                        Wellness Index: {entry.result.wellnessScore} (Emotion: {entry.result.primaryEmotion})
                      </title>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            {/* X-axis labels */}
            <div className="flex justify-between px-[16px] pt-1">
              {chartEntries.map((entry, index) => {
                const date = new Date(entry.timestamp);
                return (
                  <span key={index} className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">
                    {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Logs History List */}
      <div className="glass-panel rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Daily Wellness Ledger
          </h4>
          <button
            onClick={onClearHistory}
            className="text-[10px] font-bold text-rose-500 hover:text-rose-700 transition-colors uppercase border border-rose-200/50 hover:bg-rose-50 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            Reset Logs
          </button>
        </div>

        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {history.map((entry) => {
            const date = new Date(entry.timestamp);
            const formattedDate = date.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });

            // Get score color
            let scoreColor = "bg-rose-50 border-rose-200 text-rose-700";
            if (entry.result.wellnessScore >= 75) {
              scoreColor = "bg-emerald-50 border-emerald-200 text-emerald-700";
            } else if (entry.result.wellnessScore >= 50) {
              scoreColor = "bg-amber-50 border-amber-200 text-amber-700";
            }

            return (
              <div
                key={entry.id}
                className="p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-indigo-100 transition-all duration-200 flex items-center justify-between gap-4 group"
              >
                {/* Left side: Date, Emotion, Exam info */}
                <div 
                  onClick={() => onSelectEntry(entry)}
                  className="flex-grow cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{formattedDate}</span>
                    <span className="text-[10px] bg-purple-50 text-purple-700 font-semibold px-2 py-0.2 rounded-full uppercase">
                      {entry.inputs.examType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800 leading-tight">
                      {entry.result.primaryEmotion}
                    </span>
                    <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                      &bull; Studied {entry.inputs.hoursStudied}h, Slept {entry.inputs.sleepHours}h
                    </span>
                  </div>
                </div>

                {/* Right side: Score Badge and Trash Button */}
                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => onSelectEntry(entry)}
                    className={`w-12 py-1 rounded-xl text-center border font-extrabold text-sm shadow-sm cursor-pointer hover:scale-105 transition-transform ${scoreColor}`}
                    title="Click to view full AI report"
                  >
                    {entry.result.wellnessScore}
                  </div>
                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-2 text-gray-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                    title="Delete log entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
