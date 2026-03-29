import { Box, Typography, type SxProps, type Theme } from '@mui/material';

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function EmptyState({
  title = 'Nothing here yet',
  description,
  icon,
  action,
  sx,
}: EmptyStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      gap={2}
      sx={{ py: 10, px: 3, ...sx }}
    >
      {icon && (
        <Box sx={{ color: 'text.disabled', fontSize: 64, lineHeight: 1 }}>
          {icon}
        </Box>
      )}

      <Typography variant="h6" fontWeight={600} color="text.primary">
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" color="text.secondary" maxWidth={400}>
          {description}
        </Typography>
      )}

      {action && <Box sx={{ mt: 1 }}>{action}</Box>}
    </Box>
  );
}
