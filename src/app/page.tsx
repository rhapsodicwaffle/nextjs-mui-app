'use client';

import Link from 'next/link';
import { Box, Button, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import UserCard from '@/components/ui/UserCard';

export default function Home() {
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Light / Dark Mode
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Use the toggle in the top-right corner of the navbar to switch between light and dark
              themes. Your preference is saved to localStorage and respects your OS setting on the
              first visit.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <UserCard
              name="Alice Johnson"
              role="Frontend Engineer"
              avatarUrl="https://i.pravatar.cc/150?img=47"
            />
            <UserCard
              name="Bob Martinez"
              role="Backend Engineer"
              avatarUrl="https://i.pravatar.cc/150?img=12"
            />
          </Stack>

          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Theme-aware Paper component
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This card automatically adapts its background and text colors based on the active
              theme — no extra styles needed.
            </Typography>
          </Paper>

          <Divider />

          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Explore Pages
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" href="/users" LinkComponent={Link}>
                Users (async Server Component)
              </Button>
              <Button variant="outlined" href="/users/1" LinkComponent={Link}>
                User Detail (/users/[id])
              </Button>
              <Button variant="outlined" color="secondary" href="/components" LinkComponent={Link}>
                Component Library Demo
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
