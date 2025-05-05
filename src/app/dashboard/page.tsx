// File: /src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';

type Role = 'admin' | 'moderator' | 'user';

const actions: Record<Role, string[]> = {
  admin: ['approve', 'delete'],
  moderator: ['approve'],
  user: [],
};

// type Submission = {
//     id: string;
//     content: string;
//     submittedBy: string;
//     status: 'pending' | 'approved' | 'deleted';
//   };
  


export default function DashboardPage() {

  const [role, setRole] = useState('user');
  const [submissions, setSubmissions] = useState<any[]>([]);
  


  useEffect(() => {
    const stored = localStorage.getItem('submissions');
    if (stored) setSubmissions(JSON.parse(stored));
  }, []);

  function handleAction(id: string, action: string) {
    const updated = submissions.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: action === 'approve' ? 'approved' : 'deleted',
        };
      }
      return item;
    });
    setSubmissions(updated);
    localStorage.setItem('submissions', JSON.stringify(updated));
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submission Dashboard</h1>
      <select
        className="p-2 border rounded mb-6"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="moderator">Moderator</option>
        <option value="admin">Admin</option>
      </select>

      <ul className="space-y-4">
        {submissions.map((submission) => (
          <li key={submission.id} className="p-4 border rounded bg-gray-50">
            <p><strong>Content:</strong> {submission.content}</p>
            <p><strong>Submitted By:</strong> {submission.submittedBy}</p>
            <p><strong>Status:</strong> {submission.status}</p>
            <div className="mt-2 space-x-2">
            {actions[role as keyof typeof actions]?.includes('approve') && submission.status === 'pending' && (

                <button
                  onClick={() => handleAction(submission.id, 'approve')}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Approve
                </button>
              )}
              {actions[role as keyof typeof actions]?.includes('delete') && (

                <button
                  onClick={() => handleAction(submission.id, 'delete')}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
