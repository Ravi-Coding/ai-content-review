// File: /src/app/api/moderate/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { content } = await req.json();

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a content moderation assistant.' },
        { role: 'user', content: `Review this text for bias, spam or offensive language: \n\n${content}` },
      ],
    }),
  });

  const data = await res.json();
  const result = data.choices?.[0]?.message?.content || 'No feedback available.';
  return NextResponse.json({ result });
}