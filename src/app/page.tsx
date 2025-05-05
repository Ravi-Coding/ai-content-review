
'use client';

import { useState } from 'react';
import { checkContentModeration } from './services/openai';
import { checkPermission } from './services/permit';

export default function HomePage() {
  const [role, setRole] = useState<'admin' | 'moderator' | 'user'>('user');
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleModerate = async () => {
    const isAllowed = await checkPermission(role, 'submission', 'create');
    if (!isAllowed) {
      setError('You are not authorized to submit content.');
      return;
    }
    const output = await checkContentModeration(text);
    setResult(output);
    setError('');
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Content Review Assistant</h1>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="border px-3 py-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="user">User</option>
        </select>
      </div>
      <textarea
        className="w-full border p-3 rounded mb-4"
        rows={6}
        placeholder="Paste content to review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleModerate}
      >
        Submit for Moderation
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="bg-white p-4 mt-6 rounded shadow">
          <h2 className="text-lg font-semibold">AI Feedback</h2>
          <p className="mt-2 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </main>
  );
}