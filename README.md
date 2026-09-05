# 🧠 StudentFocusFlow

### AI-Powered Student Wellness & Study Companion

**StudentFocusFlow** is a React-based AI wellness tracking application designed to help students reflect on their **mood, study hours, sleep, and academic stress**.

The application uses **Google Gemini 2.5 Flash** to analyze a student's daily wellness information and generate personalized insights, including a wellness score, emotional state, stress triggers, positive observations, recommendations, motivation, and a realistic micro-goal for the next day.

> **Smarter Study, Healthier Mindset.**

🌐 **Live Demo:** https://student-wellness-ai-1ll2.vercel.app/

📂 **GitHub Repository:** https://github.com/pankajkumar952/Student_Focus_Flow

---

## 📖 Overview

Academic preparation can involve long study hours, irregular sleep, mock-test pressure, fear of failure, syllabus backlogs, and difficulty maintaining motivation.

StudentFocusFlow provides a simple daily reflection system where students can record:

- Their target examination
- Mood rating
- Study hours
- Sleep duration
- Personal reflection

The application then sends this information to **Google Gemini 2.5 Flash**, which analyzes the data and returns a structured wellness report.

The goal is not to diagnose mental-health conditions, but to help students become more aware of their **study habits, recovery, emotions, and academic stress**.

---

# ✨ Features

## 📝 1. Daily Wellness Log

Students can create a daily wellness entry containing:

- **Target Exam**
- **Mood Rating** from 1–10
- **Study Hours**
- **Sleep Hours**
- **Reflection Journal**

The supported exam options are focused on common academic and competitive-exam preparation.

---

## 😊 2. Mood Tracking

Students can select their current mood using a **1–10 mood slider**.

The interface provides a corresponding emotional label for the selected rating.

This allows students to track how their emotional state changes over time.

---

## 📚 3. Study Hours Tracking

Students can record their daily study duration.

The application supports study-hour adjustments directly from the daily log.

A warning is displayed when study hours become very high, helping bring attention to potentially excessive study duration.

---

## 😴 4. Sleep Tracking

Students can record their previous night's sleep duration.

The application provides a warning when sleep falls below **6 hours**, highlighting the possible impact of insufficient sleep on focus and recovery.

---

## ✍️ 5. Reflection Journal

Students can describe how their day went.

The journal can include information such as:

- Study progress
- Mock-test performance
- Syllabus progress
- Doubts
- Family pressure
- Fear of failure
- Backlog concerns
- Achievements
- General feelings

The journal gives the AI additional context for its analysis.

---

# 🤖 AI-Powered Wellness Analysis

After submitting a daily entry, Google Gemini analyzes the student's information.

The AI generates a structured report containing:

### 📊 Wellness Score

An overall wellness score from:

**0 → Higher stress / burnout risk**

to

**100 → Better overall balance**

The score considers the student's mood, study hours, sleep, and reflection.

---

### 🧠 Primary Emotion

The AI identifies the primary emotional state reflected in the student's entry.

For example:

- Determined
- Anxious
- Exhausted
- Overwhelmed
- Hopeful
- Confident

---

### ⚠️ Stress Triggers

The AI identifies relevant stressors from the student's information.

Examples can include:

- Lack of sleep
- Mock-test pressure
- Fear of failure
- Backlog anxiety
- Peer comparison
- Time-management problems

---

### 🌱 Positive Observations

The AI also identifies positive behaviors and mindsets.

Examples include:

- Consistent study effort
- Maintaining adequate sleep
- Recognizing the need for rest
- Reflecting honestly
- Improving study habits

---

### 💡 Personalized Recommendations

The AI provides practical suggestions based on the student's situation.

Recommendations may involve:

- Improving sleep
- Taking appropriate breaks
- Adjusting study intensity
- Using focused study sessions
- Reducing unnecessary pressure
- Reviewing mistakes without excessive self-criticism

---

### 💬 Motivation Message

The AI provides a personalized motivational message based on the student's current situation.

---

### 🎯 Tomorrow's Micro-Goal

The application generates **one realistic and actionable goal for the following day**.

Examples:

> Sleep by 11:00 PM tonight.

or

> Revise one topic without putting pressure on yourself.

The purpose is to encourage sustainable progress rather than unrealistic daily targets.

---

# 📈 History & Wellness Trends

StudentFocusFlow automatically saves completed wellness analyses in the browser.

The History Trends dashboard provides:

- Total number of entries
- Average wellness score
- Average study hours
- Average sleep hours
- Wellness trend visualization
- Individual historical entries

The latest entries are displayed along with their:

- Date
- Exam type
- Study hours
- Sleep hours
- Wellness score
- Primary emotion

---

# 📊 Wellness Trend Chart

The History dashboard includes a visual trend chart showing recent wellness scores.

The chart uses historical entries to help students understand how their wellness changes over time.

The application currently visualizes up to the **10 most recent history entries**.

---

# 🧪 Demo Journey

StudentFocusFlow includes a **Demo Journey** feature.

The demo loads predefined sample wellness records representing a student's changing study and wellness journey.

This makes it possible to explore the History Trends dashboard without manually creating multiple entries.

The demo data includes scenarios involving:

- Mock-test pressure
- Backlog anxiety
- Sleep deprivation
- Study stress
- Improved sleep
- Better study balance
- Increasing confidence

---

# 🗂️ History Management

Users can interact with their previous wellness entries.

The application supports:

- Viewing historical entries
- Selecting a previous entry
- Reopening its AI analysis
- Deleting individual history entries
- Clearing the complete history

---

# 🔑 Gemini API Key Configuration

StudentFocusFlow uses the **Google Gemini API** for AI analysis.

The application includes a dedicated **Gemini Settings** interface where users can enter their API key.

The API key can be:

- Added
- Viewed/hidden
- Saved
- Removed

The application also displays the current API connection status.

---

# 🔒 Data Storage

StudentFocusFlow is currently a **client-side application**.

The application uses browser `localStorage` for:

- Gemini API key
- Wellness history

No application database is included in the current project.

This means wellness history is stored locally in the browser being used.

---

# ⚠️ Security Consideration

Because the Gemini API key is used from the frontend and stored in browser `localStorage`, this implementation is most appropriate for a personal/demo/educational application.

For a production application with multiple users, a more secure architecture would use a backend service to protect API credentials and manage user data.

---

# 🏗️ Application Architecture

```text
                         ┌──────────────────────┐
                         │       Student        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Daily Wellness   │
                         │        Log           │
                         ├──────────────────────┤
                         │ • Exam Type          │
                         │ • Mood Rating        │
                         │ • Study Hours        │
                         │ • Sleep Hours        │
                         │ • Reflection         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Google Gemini      │
                         │    2.5 Flash         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                  ┌────────────────────────────────────┐
                  │        AI Wellness Analysis        │
                  ├────────────────────────────────────┤
                  │ • Wellness Score                   │
                  │ • Primary Emotion                  │
                  │ • Stress Triggers                  │
                  │ • Positive Observations            │
                  │ • Recommendations                  │
                  │ • Motivation Message               │
                  │ • Tomorrow's Micro-Goal            │
                  └─────────────────┬──────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │  Browser localStorage│
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   History Trends     │
                         │                      │
                         │ • Wellness Scores    │
                         │ • Study Statistics   │
                         │ • Sleep Statistics   │
                         │ • Previous Entries   │
                         └──────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **CSS**

## AI

- **Google Gemini API**
- `@google/generative-ai`
- **Gemini 2.5 Flash**

## Icons

- **Lucide React**

## Storage

- **Browser localStorage**

## Development

- **Node.js**
- **npm**
- **ESLint**

## Version Control

- **Git**
- **GitHub**

## Deployment

- **Vercel**

---

# 📁 Project Structure

```text
StudentFocusFlow/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── api/
│   │   └── gemini.ts
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── ApiKeyModal.tsx
│   │   ├── HistoryDashboard.tsx
│   │   ├── Navbar.tsx
│   │   ├── ResultReport.tsx
│   │   └── TrackerForm.tsx
│   │
│   ├── hooks/
│   │   └── useWellnessTracker.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

# 🔍 Main Application Components

## `App.tsx`

The main application component.

It manages:

- Active application tab
- Daily log
- AI analysis result
- History dashboard
- Gemini settings modal
- Loading state
- Error state

The primary application sections are:

```text
Daily Log
AI Analysis
History Trends
```

---

## `TrackerForm.tsx`

Responsible for collecting daily student information.

It handles:

- Exam selection
- Mood rating
- Study hours
- Sleep hours
- Reflection journal
- Form submission
- Input warnings

---

## `gemini.ts`

Contains the Google Gemini integration.

It defines the application's wellness input and AI response structures.

The AI request uses:

```text
Gemini 2.5 Flash
```

The response is expected as structured JSON containing the wellness analysis fields.

---

## `ResultReport.tsx`

Displays the AI-generated wellness report.

It presents:

- Wellness score
- Score interpretation
- Primary emotion
- Stress triggers
- Positive observations
- Recommendations
- Motivation message
- Tomorrow's micro-goal

The user can also mark the displayed micro-goal as completed within the current report view.

---

## `HistoryDashboard.tsx`

Displays historical wellness information.

It calculates:

- Total entries
- Average wellness score
- Average study hours
- Average sleep hours

It also renders the wellness trend visualization and historical records.

---

## `ApiKeyModal.tsx`

Provides the Gemini API configuration interface.

Users can:

- Enter their Gemini API key
- Show/hide the key
- Save the key
- Open Google AI Studio to obtain a key

---

## `Navbar.tsx`

Provides:

- StudentFocusFlow branding
- Main navigation
- Daily Log navigation
- AI Analysis navigation
- History Trends navigation
- Demo Journey
- Gemini connection status
- Settings access

---

## `useWellnessTracker.ts`

Acts as the main state and persistence layer.

It handles:

- API key state
- Student input state
- AI analysis state
- History state
- Loading state
- Error handling
- Local storage
- Demo history
- History deletion
- History clearing

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/pankajkumar952/Student_Focus_Flow.git
```

---

## 2. Navigate to the Project

```bash
cd Student_Focus_Flow
```

If your local folder is named `StudentFocusFlow`, use:

```bash
cd StudentFocusFlow
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start the Development Server

```bash
npm run dev
```

Vite will start the development server.

Open the local address displayed in your terminal.

Typically:

```text
http://localhost:5173
```

---

# 🔑 Configure Gemini

## Step 1 — Get a Gemini API Key

Open Google AI Studio:

https://aistudio.google.com/

Generate your Gemini API key.

---

## Step 2 — Open StudentFocusFlow

Start the project:

```bash
npm run dev
```

---

## Step 3 — Add Your API Key

Inside the application:

```text
Settings
   ↓
Gemini API Key
   ↓
Enter API Key
   ↓
Save Configuration
```

After saving, the application should show the Gemini connection status.

---

# 🧪 Run the Demo

If you want to explore the application without creating multiple historical entries manually:

1. Open StudentFocusFlow.
2. Click **Demo Journey**.
3. Open **History Trends**.
4. Explore the generated sample wellness history.

A Gemini API key is not required simply to inspect the existing demo history.

A valid Gemini API key is required when generating a **new AI analysis**.

---

# 📦 NPM Commands

## Start Development Server

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

## Run ESLint

```bash
npm run lint
```

---

# 🏭 Production Build

To create the production build:

```bash
npm run build
```

The optimized files are generated inside:

```text
dist/
```

---

# ☁️ Deployment

StudentFocusFlow is a Vite-based frontend application and can be deployed to modern static hosting platforms.

The project is suitable for deployment on:

- Vercel
- Netlify
- Other Vite-compatible hosting platforms

The current live deployment is hosted on Vercel.

🌐 **Live Application:**

https://student-wellness-ai-1ll2.vercel.app/

---

# 🎯 Project Goals

StudentFocusFlow was built to explore how generative AI can be used to support students with:

- Daily self-reflection
- Study habit awareness
- Sleep awareness
- Academic stress awareness
- Personalized recommendations
- Sustainable study goals

The project focuses on the idea that academic preparation should consider both **productivity and well-being**.

---

# 💡 Key Learning Outcomes

This project demonstrates practical experience with:

- React component development
- TypeScript
- React Hooks
- Custom hooks
- Vite
- Tailwind CSS
- Responsive UI development
- Google Gemini API integration
- Generative AI
- Structured JSON AI responses
- Browser localStorage
- State management
- Data visualization
- Error handling
- Git and GitHub
- Vercel deployment

---

# 🔮 Future Improvements

The current project can be extended with:

### 🔐 User Authentication

- User registration
- Login
- Individual student profiles

### ☁️ Backend & Database

Move data from browser `localStorage` to a backend database.

Possible technologies:

- Node.js
- Express
- Spring Boot
- PostgreSQL
- MongoDB
- Firebase
- Supabase

### 📊 Advanced Analytics

Add:

- Weekly wellness reports
- Monthly wellness reports
- Study consistency analysis
- Sleep vs. wellness analysis
- Mood vs. study-hours analysis
- Long-term wellness trends

### 🤖 AI Study & Wellness Coach

Add a conversational AI assistant for:

- Study planning
- Goal setting
- Daily reflection
- Motivation
- Study-break planning
- General wellness guidance

### 📄 Report Export

Allow students to export their wellness summaries as PDF reports.

### 🔔 Reminders

Add reminders for:

- Daily wellness logs
- Study breaks
- Sleep
- Reflection
- Daily micro-goals

### 📱 Progressive Web App

Convert the application into a PWA for a better mobile experience.

---

# ⚠️ Disclaimer

StudentFocusFlow is an **educational wellness-support application**.

The AI-generated wellness score, emotional insights, recommendations, and motivational messages are intended for **self-reflection and general wellness awareness**.

They are not:

- Medical diagnoses
- Psychiatric diagnoses
- Professional mental-health treatment
- A replacement for qualified healthcare professionals
- Emergency mental-health services

For serious mental-health concerns or emergencies, users should contact an appropriate qualified professional or local emergency service.

---

# 🤝 Contributing

Contributions and suggestions are welcome.

### Fork the repository

```bash
git clone https://github.com/pankajkumar952/Student_Focus_Flow.git
```

### Create a branch

```bash
git checkout -b feature/your-feature-name
```

### Make your changes

```bash
git add .
```

### Commit

```bash
git commit -m "Add your feature"
```

### Push

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

# ⭐ Project Highlights

```text
🧠 AI-powered student wellness analysis
🤖 Google Gemini 2.5 Flash integration
📝 Daily wellness logging
😊 Mood tracking
📚 Study-hour tracking
😴 Sleep tracking
✍️ Reflection journal
📊 Wellness score
⚠️ Stress-trigger detection
🌱 Positive observation detection
💡 Personalized recommendations
💬 AI motivation message
🎯 Tomorrow's micro-goal
📈 Historical wellness trends
🧪 Demo Journey
💾 Browser localStorage persistence
📱 Responsive interface
⚡ React + TypeScript + Vite
☁️ Vercel deployment
```

---

# 👨‍💻 Author

## Pankaj Kumar

GitHub:

https://github.com/pankajkumar952

Project:

https://github.com/pankajkumar952/Student_Focus_Flow

Live Demo:

https://student-wellness-ai-1ll2.vercel.app/

---

# ⭐ Support

If you find **StudentFocusFlow** useful:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐛 Report bugs
- 💡 Suggest improvements
- 🤝 Contribute

---

## 🧠 Smarter Study. Healthier Mindset.

StudentFocusFlow brings together **student reflection, study tracking, wellness awareness, and generative AI** in one simple application.

The goal is simple:

> **Understand your patterns, study sustainably, and keep moving forward.**