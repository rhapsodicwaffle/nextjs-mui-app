import { Box, Container, Divider, Link, Stack, Typography } from '@mui/material';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          spacing={3}
        >
          {/* Brand */}
          <Box textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              My App
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Built with Next.js &amp; MUI
            </Typography>
          </Box>

          {/* Nav links */}
          <Stack
            direction={{ xs: 'row', sm: 'column' }}
            spacing={{ xs: 2, sm: 0.5 }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                {label}
              </Link>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" textAlign="center">
          © {year} My App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
