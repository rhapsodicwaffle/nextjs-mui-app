import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/todos?_limit=10`);
    if (!res.ok) throw new Error('Failed to fetch todos');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Failed to create todo');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
