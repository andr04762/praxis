'use client';
import { useState } from 'react';

interface LabTemplate {
  starter?: string;
  language?: string;
}

export function Lab({ template, onComplete }: { template: LabTemplate; onComplete: () => void }) {
  const [output, setOutput] = useState('');
  const [code, setCode] = useState(template?.starter || '');

  async function run() {
    if (template?.language === 'sql') {
      const SQL = await import('sql.js');
      const db = new SQL.Database();
      try {
        db.run(code);
        // TODO: run tests
        onComplete();
      } catch (e: unknown) {
        const err = e as Error;
        setOutput(err.message);
      }
    } else {
      setOutput('Python labs coming soon');
    }
  }

  return (
    <div>
      <textarea
        className="w-full border p-2 font-mono"
        rows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={run} className="bg-green-700 text-white px-4 py-2 mt-2 rounded">Run</button>
      {output && <pre className="mt-2 text-sm text-red-600">{output}</pre>}
    </div>
  );
}
