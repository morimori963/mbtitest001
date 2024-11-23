import React, { useState } from 'react';
import { ChevronRight, RefreshCcw, Brain } from 'lucide-react';
import { questions } from './data/questions';
import { personalities } from './data/personalities';
import { calculatePersonality } from './utils/calculatePersonality';
import { CareerAdvice } from './components/CareerAdvice';
import { HomePage } from './components/HomePage';
import { QuestionPage } from './components/QuestionPage';
import { ResultPage } from './components/ResultPage';

type Page = 'home' | 'question' | 'result';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleStartTest = () => {
    setCurrentPage('question');
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (newAnswers.length === questions.length) {
      const personalityType = calculatePersonality(newAnswers);
      setResult(personalityType);
      setCurrentPage('result');
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    }
  };

  const resetTest = () => {
    setCurrentPage('home');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (currentPage === 'home') {
    return <HomePage onStartTest={handleStartTest} />;
  }

  if (currentPage === 'result' && result) {
    return (
      <ResultPage
        result={result}
        personality={personalities[result]}
        onReset={resetTest}
      />
    );
  }

  return (
    <QuestionPage
      question={questions[currentQuestion]}
      currentQuestion={currentQuestion}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
      onBack={handleBack}
      showBackButton={currentQuestion > 0}
      previousAnswer={answers[currentQuestion - 1]}
    />
  );
}

export default App;