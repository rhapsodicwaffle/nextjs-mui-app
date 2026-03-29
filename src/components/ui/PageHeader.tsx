import {
  Box,
  Breadcrumbs,
  Divider,
  Link,
  Typography,
  type SxProps,
  type Theme,
} from '@mui/material';

export type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  action,
  sx,
}: PageHeaderProps) {
  return (
    <Box sx={{ mb: 4, ...sx }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          {breadcrumbs.map(({ label, href }, i) =>
            href && i < breadcrumbs.length - 1 ? (
              <Link key={label} href={href} underline="hover" color="text.secondary" variant="body2">
                {label}
              </Link>
            ) : (
              <Typography key={label} variant="body2" color="text.primary">
                {label}
              </Typography>
            ),
          )}
        </Breadcrumbs>
      )}

      <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} flexWrap="wrap">
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom={!!subtitle}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
