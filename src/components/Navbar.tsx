import { BrainCircuit, Settings, Sparkles, History, FileText } from "lucide-react";

interface NavbarProps {
  activeTab: "form" | "result" | "history";
  setActiveTab: (tab: "form" | "result" | "history") => void;
  setSettingsOpen: (open: boolean) => void;
  loadMockHistory: () => void;
  hasHistory: boolean;
  hasResult: boolean;
  apiKey: string;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  setSettingsOpen,
  loadMockHistory,
  hasHistory,
  hasResult,
  apiKey,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-purple-100/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 select-none">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/20 animate-pulse-subtle">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-1.5">
                Student<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-extrabold">FocusFlow</span>
              </h1>
              <p className="text-[10px] font-medium text-purple-500/80 tracking-wider uppercase">Smater Study, Healthier Mindset</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-1 bg-purple-950/5 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("form")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "form"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
              }`}
            >
              <FileText className="h-4 w-4" />
              Daily Log
            </button>
            <button
              onClick={() => setActiveTab("result")}
              disabled={!hasResult}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "result"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : !hasResult
                  ? "text-gray-400 cursor-not-allowed opacity-50"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              AI Analysis
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "history"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
              }`}
            >
              <History className="h-4 w-4" />
              History Trends
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {!hasHistory && (
              <button
                onClick={loadMockHistory}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/50 rounded-lg transition-all duration-200 active:scale-95 cursor-pointer"
                title="Populate historical logs to demonstrate dashboard trends"
              >
                <Sparkles className="h-3.5 w-3.5 text-purple-600 animate-bounce" />
                Demo Journey
              </button>
            )}
            
            {/* API Key Status Indicator */}
            <div 
              onClick={() => setSettingsOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 ${
                apiKey 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 hover:bg-emerald-100/80" 
                  : "bg-amber-50 text-amber-700 border-amber-200/50 hover:bg-amber-100/80 animate-pulse"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${apiKey ? "bg-emerald-500" : "bg-amber-500"}`}></span>
              <span className="hidden sm:inline">{apiKey ? "Gemini Connected" : "API Key Required"}</span>
            </div>

            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-transparent hover:border-purple-100/80 cursor-pointer"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
