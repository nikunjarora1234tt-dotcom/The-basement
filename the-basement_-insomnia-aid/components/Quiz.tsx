import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface QuizProps {
  onComplete: (passed: boolean) => void;
  onCrash: (messages: string[]) => void; // Kept for prop compatibility
}

const QUIZ_QUESTIONS = [
  {
    question: "When you can't sleep, you feel...",
    options: [
      "Anxious about tomorrow's to-do list.",
      "A strange sense of clarity, like the world is a copy of a copy.",
      "Frustrated that my body won't cooperate."
    ],
  },
  {
    question: "You look at your possessions and see...",
    options: [
      "A collection of things that define your success.",
      "The things you own, ending up owning you.",
      "Just stuff. Some useful, some not."
    ],
  },
  {
    question: "The purpose of a job is...",
    options: [
      "To build a career and climb the ladder.",
      "A necessity to buy things we don't need.",
      "To pay the bills."
    ],
  },
  {
      question: "When you look at modern society, you feel...",
      options: [
        "Optimistic about progress and the future.",
        "Like a stranger in a strange land.",
        "Mostly indifferent."
    ],
  }
];

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnswerSelect = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      await analyzeAnswers(newAnswers);
    }
  };

  const analyzeAnswers = async (finalAnswers: string[]) => {
    setLoading(true);
    setError('');

    const analysisPrompt = `A user has answered a personality quiz. Their answers are:
      1. "${finalAnswers[0]}"
      2. "${finalAnswers[1]}"
      3. "${finalAnswers[2]}"
      4. "${finalAnswers[3]}"

      Analyze these answers to determine the user's mindset.
      If the user seems confident, conformist, or generally satisfied with the societal status quo, respond with the single word: FAIL.
      If the user seems disillusioned, detached, questioning of societal norms, or like an outsider, respond with the single word: PASS.

      Do not provide any explanation or additional text. Only respond with PASS or FAIL.`;
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: analysisPrompt
      });

      const result = response.text.trim().toUpperCase();
      // Use .includes() for a more robust check against minor API response variations.
      if (result.includes('PASS')) {
        onComplete(true);
      } else {
        onComplete(false);
      }
    } catch (e) {
      console.error(e);
      setError("Assessment failed. Signal is unstable.");
      setLoading(false);
      // On error, fail the quiz and trigger the rejection flow.
      onComplete(false);
    }
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center animate-[fadeIn_1s_ease-out]">
        <div className="max-w-4xl mx-auto w-full">
            <header className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-normal text-slate-800" style={{ fontFamily: "'Lora', serif" }}>
                  Personalized Sleep Assessment
                </h1>
                <p className="mt-4 text-lg text-slate-500">This is not for everyone.</p>
            </header>
            
            <main className="p-8 border border-slate-200 rounded-lg bg-white/50 shadow-sm text-center">
                {loading ? (
                    <div>
                        <h2 className="text-2xl font-normal text-slate-800 mb-6 animate-pulse" style={{ fontFamily: "'Lora', serif" }}>Analyzing...</h2>
                        <p className="text-slate-700">Please wait. We are assessing your compatibility.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-normal text-slate-800 mb-6" style={{ fontFamily: "'Lora', serif" }}>Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</h2>
                        <p className="text-slate-700 text-xl leading-relaxed mb-8">{currentQuestion.question}</p>
                        <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(option)}
                                    className="w-full text-left text-lg p-4 rounded-lg border-2 border-slate-300 hover:bg-sky-100 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {error && <p className="text-red-600 text-center mt-4 font-mono">{error}</p>}
                    </>
                )}
            </main>
        </div>
    </div>
  );
};

export default Quiz;