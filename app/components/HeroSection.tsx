import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { ComponentConfig } from '@measured/puck';

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  imageUrl?: string;
  backgroundColor?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = '',
  subtitle = '',
  buttonText = 'Shop Now',
  imageUrl = '',
  backgroundColor = 'background.default',
}) => {
  const theme = useTheme();

  return (
    <Box component="header" sx={{ bgcolor: backgroundColor }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} alignItems="center">
          <Box flex={1} textAlign={{ xs: 'center', lg: 'left' }} mb={{ xs: 4, lg: 0 }}>
            <Typography variant="h3" component="h1" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {subtitle}
            </Typography>
            <Button variant="contained" size="large">
              {buttonText}
            </Button>
          </Box>
          <Box flex={1} display="flex" justifyContent="center">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Hero"
                width={400}
                height={400}
                style={{ maxWidth: '100%', height: 'auto', maxHeight: 400 }}
              />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// export interface HeroSectionConfigProps {
//   title: string;
//   subtitle: string;
//   buttonText: string;
//   imageUrl: string;
//   backgroundColor: string;
// }

export const HeroSectionConfig: ComponentConfig<HeroSectionProps> = {
  label: 'Hero Section',
  fields: {
    title: {
      label: 'Title',
      type: 'text',
    },
    subtitle: {
      label: 'Subtitle',
      type: 'text',
    },
    buttonText: {
      label: 'Button Text',
      type: 'text',
    },
    imageUrl: {
      label: 'Image URL',
      type: 'text',
    },
    backgroundColor: {
      label: 'Background Color',
      type: 'select',
      options: [
        { value: 'background.default', label: 'Default' },
        { value: 'primary.main', label: 'Primary' },
        { value: 'secondary.main', label: 'Secondary' },
        { value: 'grey.100', label: 'Light Grey' },
        { value: 'grey.900', label: 'Dark Grey' },
        { value: 'common.white', label: 'White' },
      ],
    },
  },
  defaultProps: {
    title: 'Best place to choose your clothes',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
    buttonText: 'Shop Now',
    imageUrl: 'https://merakiui.com/images/components/Catalogue-pana.svg',
    backgroundColor: 'background.default',
  },
  render: (props: any) => <HeroSection {...props} />,
};

export default HeroSectionConfig;
