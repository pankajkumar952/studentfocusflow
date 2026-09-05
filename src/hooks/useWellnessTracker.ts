import { useState, useEffect } from "react";
import type {
  StudentWellnessInputs,
  WellnessAnalysisResponse,
} from "../api/gemini";
import { analyzeStudentWellness } from "../api/gemini";

export interface HistoryEntry {
  id: string;
  timestamp: string;
  inputs: StudentWellnessInputs;
  result: WellnessAnalysisResponse;
}

const STORAGE_KEYS = {
  API_KEY: "Student_gemini_api_key",
  HISTORY: "Student_wellness_history",
};

const DEFAULT_INPUTS: StudentWellnessInputs = {
  examType: "JEE",
  moodRating: 6,
  hoursStudied: 8,
  sleepHours: 7,
  reflectionJournal: "",
};

// Generates high-fidelity mock data representing a student's mental wellness journey over the past 7 days
const MOCK_HISTORY_DATA: HistoryEntry[] = [
  {
    id: "mock-1",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    inputs: {
      examType: "JEE",
      moodRating: 4,
      hoursStudied: 11,
      sleepHours: 5,
      reflectionJournal: "Exhausted after mock tests today. Scored lower than expected in Physics. Feeling a lot of self-doubt. My peers seem to be finishing syllabus while I am lagging behind. Hard to focus.",
    },
    result: {
      wellnessScore: 42,
      primaryEmotion: "Burnt Out",
      stressTriggers: ["Poor mock test scores", "Syllabus backlog anxiety", "Peer comparison"],
      positiveObservations: ["Dedication (studied 11 hours)", "Active reflection on obstacles"],
      recommendations: [
        "Take a complete study break for 3 hours to reset",
        "Limit mock analysis to core mistakes, do not dwell on the final score",
        "Set a strict sleeping schedule of 7 hours"
      ],
      motivationMessage: "A single mock test score does not define your JEE potential. Physics backlogs are common, tackle them in small blocks.",
      tomorrowGoal: "Limit evening study and sleep by 11:00 PM."
    }
  },
  {
    id: "mock-2",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    inputs: {
      examType: "JEE",
      moodRating: 5,
      hoursStudied: 9,
      sleepHours: 6.5,
      reflectionJournal: "Slept a bit better last night. Tried to break down my revision topics. Still feeling anxious but handled the pressure better. Did math practice in the morning.",
    },
    result: {
      wellnessScore: 55,
      primaryEmotion: "Anxious but Determined",
      stressTriggers: ["Math formulas retention", "Time management"],
      positiveObservations: ["Improved sleep hours", "Slicing study goals into smaller topics"],
      recommendations: [
        "Use flashcards for formula memorization during short intervals",
        "Celebrate completing 2 specific topics today"
      ],
      motivationMessage: "Progress is incremental. By structuring your math review today, you have taken a solid step forward.",
      tomorrowGoal: "Create flashcards for 15 math formulas."
    }
  },
  {
    id: "mock-3",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    inputs: {
      examType: "JEE",
      moodRating: 7,
      hoursStudied: 8,
      sleepHours: 7.5,
      reflectionJournal: "Had a good discussion with a group friend about Chemistry doubts. Cleared many topics. Felt supportive and less lonely. Sleep was great. Took a walk in the evening.",
    },
    result: {
      wellnessScore: 78,
      primaryEmotion: "Relieved",
      stressTriggers: ["Organic Chemistry backlog"],
      positiveObservations: ["Social connection with study group", "Healthy evening walk", "Adequate sleep"],
      recommendations: [
        "Maintain peer study sessions once a week for doubt solving",
        "Integrate the 20-minute evening walk daily"
      ],
      motivationMessage: "You are not alone in this journey. Collaborative learning lightens the cognitive burden tremendously.",
      tomorrowGoal: "Plan another short doubt clearing session with your friend."
    }
  },
  {
    id: "mock-4",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    inputs: {
      examType: "JEE",
      moodRating: 3,
      hoursStudied: 12,
      sleepHours: 4.5,
      reflectionJournal: "Stayed up late studying. Woke up with a headache. Couldn't solve organic chemistry mechanism problems and got highly frustrated. Feeling like I might fail JEE completely.",
    },
    result: {
      wellnessScore: 35,
      primaryEmotion: "Overwhelmed",
      stressTriggers: ["Sleep deprivation", "Failure anxiety", "Tough Chemistry problems"],
      positiveObservations: ["High academic drive", "Expressing heavy feelings honestly"],
      recommendations: [
        "Cease active learning for the day, engage in deep breathing or listen to soothing music",
        "Get at least 8 hours of sleep tonight to cure the headache",
        "Remind yourself that organic chemistry mechanisms require conceptual repetition, not brute-force hours"
      ],
      motivationMessage: "Your physical health directly impacts mental agility. Studying 12 hours on 4 hours of sleep is counterproductive. Be kind to your body.",
      tomorrowGoal: "Sleep by 10:30 PM with zero screen time."
    }
  },
  {
    id: "mock-5",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    inputs: {
      examType: "JEE",
      moodRating: 6,
      hoursStudied: 7,
      sleepHours: 8,
      reflectionJournal: "Prioritized sleep. Felt much fresher. Reviewed organic chemistry at a slower pace with video tutorials. Felt easier. Did not force excessive hours.",
    },
    result: {
      wellnessScore: 70,
      primaryEmotion: "Calmer",
      stressTriggers: ["Pacing issues"],
      positiveObservations: ["Restorative 8-hour sleep", "Self-compassionate study pace"],
      recommendations: [
        "Keep utilizing visual video tutorials for hard topics to make learning pleasant",
        "Limit study duration to maximum 8 hours on school/coaching days"
      ],
      motivationMessage: "Fresh minds solve complex problems. By resting, you unlocked the focus needed to decode Organic Chemistry.",
      tomorrowGoal: "Solve 5 organic chemistry mechanism questions using notes."
    }
  },
  {
    id: "mock-6",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    inputs: {
      examType: "JEE",
      moodRating: 8,
      hoursStudied: 8.5,
      sleepHours: 7,
      reflectionJournal: "Attempted a small quiz. Got 75% correct. Really proud. It proves that my slow and steady approach is working. Managed stress and did not check scores of others.",
    },
    result: {
      wellnessScore: 85,
      primaryEmotion: "Confident",
      stressTriggers: ["Minor test pressure"],
      positiveObservations: ["Healthy self-confidence", "Avoiding toxic peer comparison", "Strong test performance"],
      recommendations: [
        "Acknowledge this success! Anchor this confident feeling for future stressful moments",
        "Maintain the balanced 8-hour study and 7-hour sleep schedule"
      ],
      motivationMessage: "You are getting stronger. Trusting your custom plan is the secret to conquering JEE.",
      tomorrowGoal: "Write down 3 things you did well today in your study logs."
    }
  }
];

export function useWellnessTracker() {
  const [apiKey, setApiKeyInternal] = useState<string>(() => {
    // Check localStorage first
    const savedKey = localStorage.getItem(STORAGE_KEYS.API_KEY);
    if (savedKey) return savedKey;
    // Check Vite env variables
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey) return envKey;
    return "";
  });

  const [inputs, setInputs] = useState<StudentWellnessInputs>(DEFAULT_INPUTS);
  const [analysisResult, setAnalysisResult] = useState<WellnessAnalysisResponse | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  // Load history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history from localStorage", e);
      }
    }
  }, []);

  // Update API Key helper
  const setApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKeyInternal(trimmed);
    if (trimmed) {
      localStorage.setItem(STORAGE_KEYS.API_KEY, trimmed);
    } else {
      localStorage.removeItem(STORAGE_KEYS.API_KEY);
    }
  };

  const updateInputs = (newInputs: Partial<StudentWellnessInputs>) => {
    setInputs((prev) => ({ ...prev, ...newInputs }));
  };

  // Run the AI analysis
  const runAnalysis = async () => {
    if (!apiKey) {
      setError("Please configure your Gemini API Key in settings first.");
      setSettingsOpen(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeStudentWellness(inputs, apiKey);
      
      const newEntry: HistoryEntry = {
        id: `entry-${Date.now()}`,
        timestamp: new Date().toISOString(),
        inputs: { ...inputs },
        result,
      };

      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
      setAnalysisResult(result);
      
      // Clear journal input on successful analysis
      setInputs((prev) => ({ ...prev, reflectionJournal: "" }));
    } catch (err: any) {
      setError(err?.message || "Something went wrong during wellness analysis.");
    } finally {
      setLoading(false);
    }
  };

  // Delete an entry
  const deleteHistoryEntry = (id: string) => {
    const updated = history.filter((entry) => entry.id !== id);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    if (analysisResult && !updated.find((e) => e.result === analysisResult)) {
      setAnalysisResult(null);
    }
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    setAnalysisResult(null);
  };

  // Load pre-populated hackathon data
  const loadMockHistory = () => {
    setHistory(MOCK_HISTORY_DATA);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(MOCK_HISTORY_DATA));
    setAnalysisResult(MOCK_HISTORY_DATA[MOCK_HISTORY_DATA.length - 1].result);
  };

  return {
    apiKey,
    setApiKey,
    inputs,
    updateInputs,
    analysisResult,
    setAnalysisResult,
    history,
    loading,
    error,
    setError,
    settingsOpen,
    setSettingsOpen,
    runAnalysis,
    deleteHistoryEntry,
    clearHistory,
    loadMockHistory,
  };
}
