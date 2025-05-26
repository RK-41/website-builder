import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  Container,
} from '@mui/material';
import { Grid, GridProps } from '@mui/material';

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

export interface TestimonialsSectionProps {
  heading: string;
  highlight: string;
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  heading,
  highlight,
  testimonials,
}) => {
  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Box
        sx={{
          minHeight: '100vh',
          width: { md: '75%' },
          bgcolor: 'background.default',
        }}
      />
      <Box
        sx={{
          minHeight: '100vh',
          width: { md: '40%' },
          bgcolor: 'primary.main',
        }}
      />

      <Box
        sx={{
          position: { md: 'absolute' },
          width: '100%',
          minHeight: '100vh',
          px: 4,
          py: 10,
          mx: { md: 12 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {heading}{' '}
          <Typography component="span" color="primary.main">
            {highlight}
          </Typography>
        </Typography>

        <Grid
          container
          spacing={4}
          mt={4}
          columns={{ xs: 1, sm: 2, lg: 4 }}
          {...({} as GridProps)}
        >
          {testimonials.map((item, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, lg: 3 }} {...({} as GridProps)}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  “{item.quote}”
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Avatar
                    src={item.avatar}
                    alt={item.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" mt={6} gap={2} alignItems="center">
          <Button variant="outlined" size="small" aria-label="Previous">
            ←
          </Button>
          <Button variant="outlined" size="small" aria-label="Next">
            →
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const TestimonialsSectionConfig = {
  label: 'Testimonials Section',
  fields: {
    heading: { label: 'Heading', type: 'text' },
    highlight: { label: 'Highlight Text', type: 'text' },
    testimonials: {
      label: 'Testimonials',
      type: 'array',
      getItemSummary: (item: any) => item.name,
      arrayFields: {
        quote: { label: 'Quote', type: 'textarea' },
        name: { label: 'Name', type: 'text' },
        title: { label: 'Title', type: 'text' },
        avatar: { label: 'Avatar URL', type: 'text' },
      },
    },
  },
  defaultProps: {
    heading: 'What our',
    highlight: 'customers are saying',
    testimonials: [
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ea tempora dolores.',
        name: 'Robbert',
        title: 'CTO, Robert Consultency',
        avatar:
          'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=880&q=80',
      },
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ea tempora dolores.',
        name: 'Jeny Doe',
        title: 'CEO, Jeny Consultency',
        avatar:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=761&q=80',
      },
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ea tempora dolores.',
        name: 'Mia Brown',
        title: 'Marketing Manager at Stech',
        avatar:
          'https://images.unsplash.com/photo-1499470932971-a90681ce8530?auto=format&fit=crop&w=1470&q=80',
      },
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ea tempora dolores.',
        name: 'Lead Designer',
        title: 'Developer at Stech',
        avatar:
          'https://images.unsplash.com/photo-1488508872907-592763824245?auto=format&fit=crop&w=1470&q=80',
      },
    ],
  },
  render: (props: TestimonialsSectionProps) => <TestimonialsSection {...props} />,
};

export default TestimonialsSectionConfig;
