// File: /src/app/api/authorize/route.ts

import { NextResponse } from 'next/server';

type Role = 'admin' | 'moderator' | 'user';
type Resource = 'submission';
type Action = 'create' | 'read' | 'approve' | 'read_own';

const policies: Record<Role, Record<Resource, Action[]>> = {
  admin: { submission: ['create', 'read', 'approve'] },
  moderator: { submission: ['create', 'read'] },
  user: { submission: ['create', 'read_own'] },
};

export async function POST(req: Request) {
  const { role, resource, action }: { role: Role; resource: Resource; action: Action } = await req.json();

  const allow = policies[role]?.[resource]?.includes(action);

  return NextResponse.json({ allow });
}
