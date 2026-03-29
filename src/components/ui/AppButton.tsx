'use client';

import { Button, CircularProgress, type ButtonProps } from '@mui/material';

type AppButtonProps = ButtonProps & {
  loading?: boolean;
  solid?: boolean;
};

export default function AppButton({
  loading = false,
  solid,
  disabled,
  children,
  variant,
  sx,
  ...rest
}: AppButtonProps) {
  const resolvedVariant = variant ?? (solid ? 'contained' : 'outlined');

  return (
    <Button
      variant={resolvedVariant}
      disabled={disabled || loading}
      sx={{ minWidth: 110, ...sx }}
      {...rest}
    >
      {loading ? (
        <CircularProgress
          size={18}
          color="inherit"
          aria-label="loading"
          sx={{ mx: 1 }}
        />
      ) : (
        children
      )}
    </Button>
  );
}
