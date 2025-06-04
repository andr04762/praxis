'use client';
import { useState } from 'react';

interface Question {
  q: string;
  choices: string[];
  a: number;
}

export function Quiz({ questions, onPass }: { questions: Question[]; onPass: () => void }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const score = answers.filter((a, idx) => questions[idx].a === a).length;
  const pass = score / questions.length >= 0.8;

  return (
    <div>
      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-semibold">{q.q}</p>
          {q.choices.map((c: string, j: number) => (
            <label key={j} className="block">
              <input
                type="radio"
                name={`q-${i}`}
                value={j}
                onChange={() => setAnswers((ans) => { const copy = [...ans]; copy[i] = j; return copy; })}
              />{' '}
              {c}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={() => pass && onPass()}
        className="bg-accent text-white px-4 py-2 rounded"
        disabled={!pass}
      >
        {pass ? 'Continue' : 'Score 80% to pass'}
      </button>
    </div>
  );
}
