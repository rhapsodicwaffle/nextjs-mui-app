'use client'

import Link from 'next/link'

export default function UserNotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h2>User Not Found</h2>
      <p>The user you are looking for does not exist.</p>
      <Link href="/users">Back to Users</Link>
    </main>
  )
}
