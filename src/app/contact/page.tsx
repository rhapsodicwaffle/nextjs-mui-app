'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PageHeader from '@/components/ui/PageHeader';
import { AppButton, AppAlert } from '@/components/ui';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      {submitted && (
        <AppAlert severity="success" title="Message sent!" dismissible sx={{ mb: 3 }}>
          Thank you for contacting us. We'll get back to you soon.
        </AppAlert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Send us a message
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Fill out the form below and we'll respond as soon as possible.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={6}
                  size="small"
                />
                <Box>
                  <AppButton solid type="submit" loading={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </AppButton>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Contact Information
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    hello@myapp.com
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Phone
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Address
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    123 Main Street
                    <br />
                    San Francisco, CA 94105
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Office Hours
              </Typography>
              <Stack spacing={1} sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Monday - Friday
                  </Typography>
                  <Typography variant="body2">9:00 AM - 6:00 PM</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Saturday
                  </Typography>
                  <Typography variant="body2">10:00 AM - 4:00 PM</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Sunday
                  </Typography>
                  <Typography variant="body2">Closed</Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
