import React from 'react';
import { Brain, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onStartTest: () => void;
}

export function HomePage({ onStartTest }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <Brain className="w-20 h-20 text-indigo-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          MBTI×キャリア診断
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          自己理解を深め、あなたの強みを活かせる理想のキャリアを見つけましょう。
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <ChevronRight className="text-indigo-500 flex-shrink-0" />
            <p className="text-gray-700 text-left">所要時間は約5分です</p>
          </div>
          <div className="flex items-center space-x-3">
            <ChevronRight className="text-indigo-500 flex-shrink-0" />
            <p className="text-gray-700 text-left">16タイプの性格診断結果</p>
          </div>
          <div className="flex items-center space-x-3">
            <ChevronRight className="text-indigo-500 flex-shrink-0" />
            <p className="text-gray-700 text-left">AIによるキャリアアドバイス</p>
          </div>
        </div>

        <button
          onClick={onStartTest}
          className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
        >
          診断を始める
          <ChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}