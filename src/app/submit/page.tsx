'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const [content, setContent] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/moderate', {
      method: 'POST',
      body: JSON.stringify({ content }),
    });

    const result = await res.json();

    if (result.flagged) {
      setError('Content flagged by moderation system. Please revise.');
      return;
    }

    const submission = {
      id: Date.now().toString(),
      content,
      status: 'pending',
      submittedBy: role,
    };

    // Store in localStorage temporarily for demo
    const stored = JSON.parse(localStorage.getItem('submissions') || '[]');
    localStorage.setItem('submissions', JSON.stringify([...stored, submission]));

    router.push('/dashboard');
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submit AI Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 border rounded"
          rows={6}
          placeholder="Enter your AI-generated content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </main>
  );
}
