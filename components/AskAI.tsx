'use client';
import { useState } from 'react';

export function AskAI() {
  const [messages, setMessages] = useState<{role:string,content:string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    const res = await fetch('/api/assistant', {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, { role: 'user', content: input }] }),
    });
    const reader = res.body!.getReader();
    let ai = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      ai += new TextDecoder().decode(value);
      setMessages((m) => [...m]);
    }
    setMessages((m) => [...m, { role: 'user', content: input }, { role: 'assistant', content: ai }]);
    setInput('');
    setLoading(false);
  }

  return (
    <div className="border rounded p-2 h-64 overflow-y-auto flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((m, i) => (
          <p key={i} className={m.role === 'user' ? 'text-right' : ''}>{m.content}</p>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          className="border flex-1 p-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          disabled={loading}
          onClick={send}
          className="bg-green-700 text-white px-3 ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
