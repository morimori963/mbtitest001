import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface Question {
  text: string;
  options: string[];
}

interface QuestionPageProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
  onBack: () => void;
  showBackButton: boolean;
  previousAnswer?: number;
}

export function QuestionPage({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
  onBack,
  showBackButton,
  previousAnswer,
}: QuestionPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <button
                  onClick={onBack}
                  className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm">前の質問</span>
                </button>
              )}
              <h2 className="text-2xl font-bold text-gray-800">質問 {currentQuestion + 1}/{totalQuestions}</h2>
            </div>
            <span className="text-sm text-gray-500">{Math.round((currentQuestion / totalQuestions) * 100)}% 完了</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.text}</h3>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                previousAnswer === index
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}