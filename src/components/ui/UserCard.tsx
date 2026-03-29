'use client';

import { Avatar, Card, CardContent, Typography, Box } from '@mui/material';

interface UserCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

export default function UserCard({ name, role, avatarUrl }: UserCardProps) {
  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={avatarUrl} alt={name} sx={{ width: 52, height: 52 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
