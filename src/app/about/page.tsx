import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import PageHeader from '@/components/ui/PageHeader';

export const metadata = {
  title: 'About | My Next.js App',
  description: 'Learn more about our Next.js application',
};

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <PageHeader
        title="About This Project"
        subtitle="A modern Next.js 16+ application with Material UI"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <Stack spacing={4}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Tech Stack
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2" color="primary">
                Next.js 16+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                React framework with App Router, Server Components, and async data fetching
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="primary">
                Material UI (MUI)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Component library with custom theming and light/dark mode support
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="primary">
                TypeScript
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type-safe development with full IntelliSense support
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Features
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack component="ul" spacing={0.5} sx={{ pl: 2 }}>
            <Typography component="li" variant="body2">
              🎨 Custom MUI theme with light/dark mode toggle
            </Typography>
            <Typography component="li" variant="body2">
              📱 Responsive layout with mobile-friendly navigation
            </Typography>
            <Typography component="li" variant="body2">
              🚀 Server Components for optimal performance
            </Typography>
            <Typography component="li" variant="body2">
              🔗 Dynamic routing with params support
            </Typography>
            <Typography component="li" variant="body2">
              🧩 Reusable component library
            </Typography>
            <Typography component="li" variant="body2">
              ✨ ESLint and Prettier for code quality
            </Typography>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Architecture
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary" paragraph>
            This application follows Next.js 16+ best practices using the App Router. Server
            Components are used by default for optimal performance, with Client Components
            ("use client") only where interactivity is required.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The theme system leverages React Context for state management, allowing seamless
            switching between light and dark modes with localStorage persistence.
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
}
