'use client';

import { notFound } from 'next/navigation'
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { getUserById } from '@/lib/users'
import PageHeader from '@/components/ui/PageHeader'
import { useEffect, useState } from 'react'
import type { User } from '@/lib/users'

type Props = { params: Promise<{ id: string }> }

export default function UserDetailPage({ params }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string>('')

  useEffect(() => {
    params.then((p) => {
      setId(p.id)
      getUserById(p.id).then((data) => {
        setUser(data)
        setLoading(false)
      })
    })
  }, [params])

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography>Loading...</Typography>
      </Container>
    )
  }

  if (!user) notFound()

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <PageHeader
        title={user.name}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
          { label: user.name },
        ]}
      />

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        {[
          { label: 'ID', value: user.id },
          { label: 'Username', value: user.username },
          { label: 'Email', value: user.email },
        ].map(({ label, value }) => (
          <Box key={label}>
            <Box display="flex" justifyContent="space-between" alignItems="center" py={1.5}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {label}
              </Typography>
              <Typography variant="body2">{value}</Typography>
            </Box>
            <Divider />
          </Box>
        ))}
      </Paper>

      <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <Chip label={`ID: ${user.id}`} size="small" color="primary" variant="outlined" />
        <Button variant="outlined" size="small" href="/users" LinkComponent={Link}>
          ← Back to Users
        </Button>
      </Box>
    </Container>
  )
}
