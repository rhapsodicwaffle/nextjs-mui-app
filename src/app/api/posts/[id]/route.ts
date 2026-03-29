import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://jsonplaceholder.typicode.com';

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const res = await fetch(`${API_BASE}/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Failed to update post');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete post');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
