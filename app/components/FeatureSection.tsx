import React from 'react';
import { Box, Typography, Container, Paper, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import NightlightIcon from '@mui/icons-material/Nightlight';
import StarIcon from '@mui/icons-material/Star';

const iconMap: Record<string, React.ReactElement> = {
  ContentCopyIcon: <ContentCopyIcon />,
  SettingsIcon: <SettingsIcon />,
  NightlightIcon: <NightlightIcon />,
  StarIcon: <StarIcon />,
};

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureSectionProps {
  heading: string;
  highlight: string;
  videoSrc: string;
  features: FeatureItem[];
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  heading,
  highlight,
  videoSrc,
  features,
}) => {
  return (
    <Box component="section" sx={{ bgcolor: 'background.default', py: 10 }}>
      <Container>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          {heading}{' '}
          <Typography component="span" color="primary">
            {highlight}
          </Typography>
        </Typography>

        <Box
          component="iframe"
          src={videoSrc}
          sx={{
            mt: 6,
            width: '100%',
            height: { xs: 300, md: 450 },
            border: 0,
            borderRadius: 2,
            overflow: 'hidden',
          }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />

        <Grid container spacing={4} mt={4}>
          {features.map((feature, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Box display="flex" alignItems="flex-start">
                  <Avatar
                    sx={{
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      mr: 2,
                    }}
                  >
                    {iconMap[feature.icon]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export const FeatureSectionConfig = {
  label: 'Feature Section',
  fields: {
    heading: { label: 'Heading', type: 'text' },
    highlight: { label: 'Highlight', type: 'text' },
    videoSrc: { label: 'Video URL', type: 'text' },
    features: {
      label: 'Features',
      type: 'array',
      getItemSummary: (item: any) => item.title,
      arrayFields: {
        title: { label: 'Title', type: 'text' },
        description: { label: 'Description', type: 'textarea' },
        icon: {
          label: 'Icon',
          type: 'select',
          options: [
            { value: 'ContentCopyIcon', label: 'Copy' },
            { value: 'SettingsIcon', label: 'Settings' },
            { value: 'NightlightIcon', label: 'Dark Mode' },
            { value: 'StarIcon', label: 'Star' },
          ],
        },
      },
    },
  },
  defaultProps: {
    heading: 'Explore our awesome',
    highlight: 'Components',
    videoSrc: 'https://player.vimeo.com/video/525707984',
    features: [
      {
        icon: 'ContentCopyIcon',
        title: 'Copy & paste components',
        description: 'Lorem ipsum...',
      },
      {
        icon: 'SettingsIcon',
        title: 'Zero Configuration',
        description: 'Lorem ipsum...',
      },
      {
        icon: 'NightlightIcon',
        title: 'Elegant Dark Mode',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos.',
      },
      {
        icon: 'StarIcon',
        title: 'Simple & clean designs',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos.',
      },
    ],
  },
  render: (props: FeatureSectionProps) => <FeatureSection {...props} />,
};

// export default FeatureSectionConfig;
