'use client';

import { useState } from 'react';

export default function AuthorizeTestPage() {
  const [role, setRole] = useState('user');
  const [resource, setResource] = useState('submission');
  const [action, setAction] = useState('create');
  const [result, setResult] = useState<null | boolean>(null);

  const testAuthorization = async () => {
    const res = await fetch('/api/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, resource, action }),
    });
    const data = await res.json();
    setResult(data.allow);
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Authorization Test UI</h1>

      <label className="block mb-2">Select Role</label>
      <select className="w-full p-2 border mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">admin</option>
        <option value="moderator">moderator</option>
        <option value="user">user</option>
      </select>

      <label className="block mb-2">Select Action</label>
      <select className="w-full p-2 border mb-4" value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="create">create</option>
        <option value="read">read</option>
        <option value="approve">approve</option>
        <option value="read_own">read_own</option>
      </select>

      <button
        onClick={testAuthorization}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Access
      </button>

      {result !== null && (
        <div className={`mt-4 p-4 rounded ${result ? 'bg-green-200' : 'bg-red-200'}`}>
          {result ? '✅ Access Granted' : '❌ Access Denied'}
        </div>
      )}
    </main>
  );
}
