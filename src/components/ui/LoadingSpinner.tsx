'use client';

import { Box, CircularProgress, Typography } from '@mui/material';

type LoadingSpinnerProps = {
  label?: string;
  size?: number;

  fullHeight?: boolean;
};

export default function LoadingSpinner({
  label = 'Loading…',
  size = 48,
  fullHeight = false,
}: LoadingSpinnerProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ minHeight: fullHeight ? '100vh' : 200, width: '100%' }}
      role="status"
      aria-label={label}
    >
      <CircularProgress size={size} />
      {label && (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      )}
    </Box>
  );
}
