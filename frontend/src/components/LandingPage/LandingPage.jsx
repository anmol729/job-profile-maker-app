import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import {
  AutoAwesomeOutlined,
  SpeedOutlined,
  PreviewOutlined,
  CloudUploadOutlined,
  MobileScreenShareOutlined,
  SecurityOutlined,
  DownloadOutlined,
  ShareOutlined
} from '@mui/icons-material';

const LandingPage = ({ onGetStarted }) => {
  const theme = useTheme();

  const features = [
    {
      icon: <AutoAwesomeOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Intelligent Forms',
      description: 'Complete your personal info, education, work experience, CV, skills, certifications, and more—all through easy, guided steps.'
    },
    {
      icon: <PreviewOutlined sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      title: 'Live Profile Preview',
      description: 'Instantly see how your job profile looks as you fill it out. Make edits and see updates in real time.'
    },
    {
      icon: <CloudUploadOutlined sx={{ fontSize: 40, color: theme.palette.info.main }} />,
      title: 'City-Based Data',
      description: 'Add your location and get automatic weather and city details to personalize your profile.'
    },
    {
      icon: <SpeedOutlined sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Phone Number Validation',
      description: 'Ensure your contact details are always correct with built-in phone validation.'
    },
    {
      icon: <MobileScreenShareOutlined sx={{ fontSize: 40, color: theme.palette.warning.main }} />,
      title: 'Job Posting Capabilities',
      description: 'Looking for opportunities? Post your job profile directly from the app.'
    },
    {
      icon: <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DownloadOutlined sx={{ fontSize: 32, color: theme.palette.primary.main, mr: 1 }} />
        <ShareOutlined sx={{ fontSize: 32, color: theme.palette.secondary.main }} />
      </Box>,
      title: 'Download & Share',
      description: 'Easily download your finished profile or share it directly with employers and recruiters.'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section with Enhanced Background */}
      <Box
        sx={{
          background: `
            radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 50%),
            linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)
          `,
          pt: 8,
          pb: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Chip
                  label="✨ Professional Profile Maker"
                  sx={{
                    mb: 3,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    fontWeight: 600
                  }}
                />
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Create Your Perfect Job Profile in Minutes
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    maxWidth: 500
                  }}
                >
                  Build a professional job profile that gets you noticed. Our intelligent platform guides you through every step.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onGetStarted}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`
                      }
                    }}
                  >
                    Get Started Creating Profile
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper
                  elevation={20}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    transform: 'rotate(-2deg)',
                    maxWidth: 400,
                    width: '100%'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    John Doe
                  </Typography>
                  <Typography variant="body2" color="primary.main" sx={{ mb: 3, fontWeight: 600 }}>
                    Senior Software Engineer
                  </Typography>
                  <Box sx={{ height: 8, bgcolor: 'primary.main', borderRadius: 1, mb: 2 }} />
                  <Box sx={{ height: 4, bgcolor: 'grey.300', borderRadius: 1, mb: 1 }} />
                  <Box sx={{ height: 4, bgcolor: 'grey.300', borderRadius: 1, mb: 1, width: '80%' }} />
                  <Box sx={{ height: 4, bgcolor: 'grey.300', borderRadius: 1, mb: 3, width: '60%' }} />
                  <Box sx={{ height: 6, bgcolor: 'secondary.main', borderRadius: 1, mb: 2 }} />
                  <Box sx={{ height: 4, bgcolor: 'grey.300', borderRadius: 1, mb: 1 }} />
                  <Box sx={{ height: 4, bgcolor: 'grey.300', borderRadius: 1, width: '90%' }} />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
            Features of  our Profile Maker
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Everything you need to create a professional job profile that stands out
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.1)}`
                  }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
            Why Choose Us?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover what makes our Job Profile Maker the best way to build your professional presence.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Step-by-Step, Multi-Section UI
              </Typography>
              <Typography color="text.secondary">
                Our intuitive, multi-step interface breaks down profile creation into manageable, focused sections—no more overwhelming forms!
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Smart Validation at Every Step
              </Typography>
              <Typography color="text.secondary">
                We check your entries as you go, so your profile is always complete and error-free.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Live, Export-Ready Profile
              </Typography>
              <Typography color="text.secondary">
                Instantly preview your job profile and export it when you’re ready—no extra formatting needed.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 3, height: '100%', mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                All-in-One Experience
              </Typography>
              <Typography color="text.secondary">
                From personal details to certifications, city data, and job postings, everything you need is in one place.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 3, height: '100%', mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Personalized Touches
              </Typography>
              <Typography color="text.secondary">
                Add weather and location info to make your profile stand out to employers.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 3, height: '100%', mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Easy to Update
              </Typography>
              <Typography color="text.secondary">
                Edit, update, and improve your profile anytime—your career evolves, and so should your job profile.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              Ready to Build Your Job Profile?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Join thousands of professionals who have successfully created their job profiles with us.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={onGetStarted}
              sx={{
                py: 1.5,
                px: 6,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1.2rem',
                fontWeight: 600
              }}
            >
              Start Creating Profile Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
