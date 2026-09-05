import { GoogleGenerativeAI } from "@google/generative-ai";

export interface StudentWellnessInputs {
  examType: string;
  moodRating: number;      // 1 to 10 scale
  hoursStudied: number;
  sleepHours: number;
  reflectionJournal: string;
}

export interface WellnessAnalysisResponse {
  wellnessScore: number;         // Scale of 0-100 (overall mental wellness index)
  primaryEmotion: string;        // e.g. "Determined", "Anxious", "Burnt Out", "Hopeful", "Overwhelmed"
  stressTriggers: string[];      // Main triggers derived from journal and stats
  positiveObservations: string[]; // Positive behaviors or mindset observed
  recommendations: string[];     // Coping strategies, relaxation techniques, study modifications
  motivationMessage: string;     // Short, empathetic, highly motivating sentence or two
  tomorrowGoal: string;          // Actionable, realistic micro-goal for tomorrow
}

export async function analyzeStudentWellness(
  inputs: StudentWellnessInputs,
  apiKey: string
): Promise<WellnessAnalysisResponse> {
  if (!apiKey) {
    throw new Error("Gemini API key is required. Please set it in Settings.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Use gemini-1.5-flash for fast, structured JSON responses
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4,
    },
  });

  const prompt = `
You are an empathetic, expert student mental wellness counselor specializing in competitive exam stress (like JEE, NEET, UPSC, CAT, GATE, CUET, and Board Exams).
Your role is to analyze a student's daily logs and provide supportive, actionable, and structured insights.

Here are the details from the student's entry today:
- Exam preparing for: ${inputs.examType}
- Mood rating (1-10, where 1 is extremely low/depressed and 10 is joyful/highly energetic): ${inputs.moodRating}
- Hours studied today: ${inputs.hoursStudied} hours
- Sleep hours last night: ${inputs.sleepHours} hours
- Reflection Journal: "${inputs.reflectionJournal || "No journal entry provided."}"

Guidelines for analysis:
1. "wellnessScore": Calculate an overall mental wellness score from 0 (extreme crisis/burnout) to 100 (excellent mental peace and balance) based on the inputs. High study hours with low sleep and low mood should result in a lower wellness score indicating burnout risk.
2. "primaryEmotion": Identify a single primary emotional state representing their journal entry and ratings (e.g., "Overwhelmed", "Determined", "Anxious", "Exhausted", "Quietly Confident").
3. "stressTriggers": Extract 1 to 3 specific stressors from their log (e.g., "Lack of sleep", "Fear of failure", "Mock test performance pressure", "Backlog anxiety", "Unrealistic study goals").
4. "positiveObservations": Identify 1 to 3 healthy habits or positive mindsets they displayed (e.g., "Dedicated study schedule", "Opening up in journal", "Recognizing the need for rest", "Maintaining study hours despite stress").
5. "recommendations": Provide 2 to 4 empathetic, realistic, actionable wellness suggestions tailored to their situation (e.g., "Take a 15-minute mindfulness walk", "Try the Pomodoro technique to lessen fatigue", "Implement a hard stop for studying at 10 PM to protect sleep", "Write down 3 things you got right instead of focusing only on backlogs").
6. "motivationMessage": Write a personal, warm, encouraging message addressing their target exam. Keep it empathetic and avoid cliché toxic positivity.
7. "tomorrowGoal": Recommend ONE micro-goal for tomorrow. It must be highly specific, achievable, and health-conscious (e.g., "Sleep by 11:00 PM tonight", "Study 45 minutes, then take a 5-minute deep breathing break", "Revise only one topic without pressure").

You must return a valid JSON object matching this schema exactly:
{
  "wellnessScore": number,
  "primaryEmotion": "string",
  "stressTriggers": ["string"],
  "positiveObservations": ["string"],
  "recommendations": ["string"],
  "motivationMessage": "string",
  "tomorrowGoal": "string"
}
`;

  try {
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    if (!textResponse) {
      throw new Error("Received empty response from Gemini API.");
    }

    const parsedData = JSON.parse(textResponse.trim()) as WellnessAnalysisResponse;

    // Ensure data shapes align and values fall within correct ranges
    if (typeof parsedData.wellnessScore !== 'number') {
      parsedData.wellnessScore = Number(parsedData.wellnessScore) || 50;
    }
    parsedData.stressTriggers = parsedData.stressTriggers || [];
    parsedData.positiveObservations = parsedData.positiveObservations || [];
    parsedData.recommendations = parsedData.recommendations || [];

    return parsedData;
  } catch (error: any) {
    console.error("Gemini API wellness analysis failed:", error);
    throw new Error(error?.message || "Failed to analyze wellness. Please check your API key and network connection.");
  }
}
