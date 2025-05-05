// File: /src/app/services/permit.ts
export async function checkPermission(role: string, resource: string, action: string) {
    const res = await fetch('/api/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, resource, action }),
    });
    const data = await res.json();
    return data.allow;
  }