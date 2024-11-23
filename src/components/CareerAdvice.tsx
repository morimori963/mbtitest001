import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import OpenAI from 'openai';

interface CareerAdviceProps {
  personalityType: string;
  personalityTitle: string;
  traits: string[];
}

export function CareerAdvice({ personalityType, personalityTitle, traits }: CareerAdviceProps) {
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [concerns, setConcerns] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetAdvice = async () => {
    if (!apiKey) {
      setError('APIキーを入力してください');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "あなたはキャリアカウンセラーです。MBTIの診断結果と個人情報に基づいて、具体的なキャリアアドバイスを提供してください。"
          },
          {
            role: "user",
            content: `
              MBTI診断結果:
              タイプ: ${personalityType}
              タイトル: ${personalityTitle}
              特徴:
              ${traits.join('\n')}

              個人情報:
              年齢: ${age}歳
              現在の職業: ${occupation}
              現状の悩み: ${concerns}

              この情報に基づいて、以下の点を含めた具体的なキャリアアドバイスを提供してください：
              1. 向いている職種や業界
              2. スキルアップの方向性
              3. 現状の悩みへの対処方法
              4. 長期的なキャリア展望
            `
          }
        ]
      });

      setAdvice(response.choices[0]?.message?.content || '申し訳ありません。アドバイスを生成できませんでした。');
    } catch (err) {
      setError('アドバイスの取得中にエラーが発生しました。APIキーを確認してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            年齢
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="例: 25"
          />
        </div>
        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
            現在の職業
          </label>
          <input
            type="text"
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="例: システムエンジニア"
          />
        </div>
        <div>
          <label htmlFor="concerns" className="block text-sm font-medium text-gray-700">
            現状の悩み
          </label>
          <textarea
            id="concerns"
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="例: キャリアの方向性が定まらない"
          />
        </div>
      </div>

      {!showApiKey ? (
        <button
          onClick={() => setShowApiKey(true)}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          専門家による精密診断を受ける
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
              OpenAI APIキー
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="sk-..."
            />
          </div>
          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={20} />
                分析中...
              </span>
            ) : (
              'アドバイスを取得'
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {advice && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">キャリアアドバイス</h3>
          <div className="whitespace-pre-wrap text-gray-700">{advice}</div>
        </div>
      )}
    </div>
  );
}