// File: /src/app/services/openai.ts
export async function checkContentModeration(content: string) {
    const res = await fetch('/api/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    return data.result;
  }
  