import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/posts?_limit=10`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Failed to create post');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
