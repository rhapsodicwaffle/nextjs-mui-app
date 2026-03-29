'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function UserDetailError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ padding: 24 }}>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset} style={{ marginRight: 12 }}>
        Try again
      </button>
      <Link href="/users">Back to Users</Link>
    </main>
  );
}
