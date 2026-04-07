import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest, unauthorizedResponse } from '@/lib/auth/helpers'
import { PostSchema } from '@/lib/validation'

const API_BASE = 'https://jsonplaceholder.typicode.com'

export async function GET(request: NextRequest) {
  // Optional authentication (removed requirement)
  // const user = await authenticateRequest(request)
  // if (!user) {
  //   return unauthorizedResponse()
  // }

  try {
    const res = await fetch(`${API_BASE}/posts?_limit=100`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Require authentication
  const user = await authenticateRequest(request)
  if (!user) {
    return unauthorizedResponse()
  }

  try {
    const body = await request.json()

    // Validate input
    const validation = PostSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...validation.data,
        userId: user.userId,
      }),
    })
    if (!res.ok) throw new Error('Failed to create post')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
