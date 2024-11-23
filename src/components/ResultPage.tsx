import React from 'react';
import { ChevronRight, RefreshCcw } from 'lucide-react';
import { CareerAdvice } from './CareerAdvice';

interface ResultPageProps {
  result: string;
  personality: {
    title: string;
    traits: string[];
    summary: string;
  };
  onReset: () => void;
}

export function ResultPage({ result, personality, onReset }: ResultPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-8 px-4">
      <div className="max-w-2xl mx-auto w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">{result}</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{personality.title}</h2>
          
          <div className="bg-indigo-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">特徴:</h3>
            <ul className="text-left space-y-2">
              {personality.traits.map((trait, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="text-indigo-500 mr-2" size={16} />
                  <span className="text-gray-700">{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-700 mb-8">{personality.summary}</p>

          <CareerAdvice
            personalityType={result}
            personalityTitle={personality.title}
            traits={personality.traits}
          />

          <button
            onClick={onReset}
            className="mt-8 inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <RefreshCcw className="mr-2" size={20} />
            テストをやり直す
          </button>
        </div>
      </div>
    </div>
  );
}