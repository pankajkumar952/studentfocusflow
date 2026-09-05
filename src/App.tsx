import { useState, useEffect } from "react";
import { useWellnessTracker } from "./hooks/useWellnessTracker";
import type { HistoryEntry } from "./hooks/useWellnessTracker";
import Navbar from "./components/Navbar";
import ApiKeyModal from "./components/ApiKeyModal";
import TrackerForm from "./components/TrackerForm";
import ResultReport from "./components/ResultReport";
import HistoryDashboard from "./components/HistoryDashboard";
import { Brain, Key } from "lucide-react";

export default function App() {
  const {
    apiKey,
    setApiKey,
    inputs,
    updateInputs,
    analysisResult,
    setAnalysisResult,
    history,
    loading,
    error,
    settingsOpen,
    setSettingsOpen,
    runAnalysis,
    deleteHistoryEntry,
    clearHistory,
    loadMockHistory,
  } = useWellnessTracker();

  const [activeTab, setActiveTab] = useState<"form" | "result" | "history">("form");

  // Automatically switch tab to result when analysis finishes
  useEffect(() => {
    if (analysisResult) {
      setActiveTab("result");
    }
  }, [analysisResult]);

  const handleFormSubmit = async () => {
    await runAnalysis();
  };

  const handleSelectHistoryEntry = (entry: HistoryEntry) => {
    setAnalysisResult(entry.result);
    updateInputs(entry.inputs);
    setActiveTab("result");
  };



  return (
    <div className="min-height-screen bg-blue-950 text-slate-800 flex flex-col font-sans relative pb-12">
      {/* Background aura designs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/20 via-purple-200/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-pink-200/10 via-indigo-100/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Soothing Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSettingsOpen={setSettingsOpen}
        loadMockHistory={loadMockHistory}
        hasHistory={history.length > 0}
        hasResult={analysisResult !== null}
        apiKey={apiKey}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* API Warning Alert for First Time Users */}
        {!apiKey && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-900 text-xs font-medium flex items-center justify-between gap-4 shadow-sm animate-pulse-subtle">
            <div className="flex items-center gap-2">
              <Key className="h-4.5 w-4.5 text-amber-500 shrink-0" />
              <span>
                <strong>Aura AI Tracker needs a Gemini API Key to function.</strong> Click "Get Free Key" or tap "Demo Journey" in the header to pre-populate logs and explore!
              </span>
            </div>
            <button
              onClick={() => setSettingsOpen(true)}
              className="text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              Set Key
            </button>
          </div>
        )}

        {/* Loading Overlay State */}
        {loading && (
          <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="text-center space-y-4 max-w-xs px-6">
              <div className="relative flex items-center justify-center mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/20">
                <Brain className="h-8 w-8 animate-pulse" />
                <div className="absolute inset-0 rounded-2xl border-2 border-indigo-200 animate-ping opacity-20"></div>
              </div>
              <h3 className="text-base font-bold text-gray-900">Aura AI Advisor Active</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Analyzing sleep duration, mood patterns, and journaling variables to evaluate burnout risk...
              </p>
              <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden mx-auto">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-2/3 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Selection Navigation for Mobile Screens */}
        <div className="flex md:hidden mb-6 bg-purple-950/5 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-3 text-center text-xs font-bold rounded-xl transition-all duration-200 ${
              activeTab === "form" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            Daily Log
          </button>
          <button
            onClick={() => setActiveTab("result")}
            disabled={!analysisResult}
            className={`flex-1 py-3 text-center text-xs font-bold rounded-xl transition-all duration-200 ${
              activeTab === "result"
                ? "bg-white text-indigo-600 shadow-sm"
                : !analysisResult
                ? "text-gray-300 cursor-not-allowed opacity-50"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            AI Report
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 text-center text-xs font-bold rounded-xl transition-all duration-200 ${
              activeTab === "history" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            History Trends
          </button>
        </div>

        {/* Render Active Tab Screen */}
        <div className="min-h-[400px]">
          {activeTab === "form" && (
            <TrackerForm
              inputs={inputs}
              onChange={updateInputs}
              onSubmit={handleFormSubmit}
              loading={loading}
              error={error}
              apiKey={apiKey}
              setSettingsOpen={setSettingsOpen}
            />
          )}

          {activeTab === "result" && analysisResult && (
            <ResultReport
              result={analysisResult}
              onReset={() => setActiveTab("form")}
              examType={inputs.examType}
            />
          )}

          {activeTab === "history" && (
            <HistoryDashboard
              history={history}
              onSelectEntry={handleSelectHistoryEntry}
              onDeleteEntry={deleteHistoryEntry}
              onClearHistory={clearHistory}
              loadMockHistory={loadMockHistory}
            />
          )}
        </div>
      </main>

      {/* Floating Settings API Modal */}
      <ApiKeyModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        apiKey={apiKey}
        onSave={setApiKey}
      />
    </div>
  );
}
