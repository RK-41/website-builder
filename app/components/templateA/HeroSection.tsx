import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';

interface HeroButton {
  text: string;
  href: string;
  variant?: 'contained' | 'outlined' | 'text';
  textColor?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disableElevation?: boolean;
}

export interface HeroSectionProps {
  heading: string;
  subheading: string;
  buttons: HeroButton[];
  backgroundColor?: string;
  headingColor?: string;
  subheadingColor?: string;
}

const defaultButtons: HeroButton[] = [
  {
    text: "Get Started",
    href: "#",
    variant: "contained",
    textColor: "#ffffff",
    color: "#1976d2",
    size: "large",
    fullWidth: false,
    disableElevation: false,
  },
  {
    text: "Get Started",
    href: "#",
    variant: "outlined",
    textColor: "#ffffff",
    color: "#1976d2",
    size: "large",
    fullWidth: false,
    disableElevation: false,
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subheading,
  buttons = defaultButtons,
  backgroundColor = '#1976d2', // Default blue background
  headingColor = '#ffffff', // Default white text
  subheadingColor = '#e0e0e0', // Default light gray text
}) => {

  return (
    <Box
      component="section"
      sx={{
        bgcolor: backgroundColor,
        color: 'white', // Fallback text color
        py: 10,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: headingColor,
            mb: 3,
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
          }}
        >
          {heading}
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            color: subheadingColor,
            mb: 5,
            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
            px: { xs: 2, md: 0 },
          }}
        >
          {subheading}
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ px: { xs: 2, md: 0 } }}
        >
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              size={button.size}
              fullWidth={button.fullWidth}
              disableElevation={button.disableElevation}
              href={button.href}
              sx={{
                ...(button.color ?
                  (button.variant === 'contained' ? { bgcolor: button.color, color: 'white' } : { color: button.color, borderColor: button.color })
                  : {}),
                ...(button.textColor ? { color: button.textColor } : {}),
              }}
            >
              {button.text}
            </Button>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export const HeroSectionConfigA = {
  label: "Hero Section",
  fields: {
    heading: { type: "text", label: "Heading" },
    subheading: { type: "text", label: "Subheading" },
    backgroundColor: {
      type: "custom",
      label: "Background Color",
      render: ({ value, onChange }) => (
        <MuiColorInput
          value={value}
          onChange={onChange}
          label="Background Color"
        />
      ),
    } as any,
    headingColor: {
      type: "custom",
      label: "Heading Color",
      render: ({ value, onChange }) => (
        <MuiColorInput
          value={value}
          onChange={onChange}
          label="Heading Color"
        />
      ),
    } as any,
    subheadingColor: {
      type: "custom",
      label: "Subheading Color",
      render: ({ value, onChange }) => (
        <MuiColorInput
          value={value}
          onChange={onChange}
          label="Subheading Color"
        />
      ),
    } as any,
    buttons: {
      type: "array",
      label: "Buttons",
      getItemSummary: (item: any) => item.text,
      arrayFields: {
        text: { type: "text", label: "Text" },
        href: { type: "text", label: "URL" },
        variant: {
          type: "radio",
          label: "Variant",
          options: [
            { value: "contained", label: "Contained" },
            { value: "outlined", label: "Outlined" },
            { value: "text", label: "Text" }
          ]
        },
        textColor: {
          type: "custom",
          label: "Color",
          render: ({ value, onChange }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Text Color"
            />
          ),
        } as any,
        color: {
          type: "custom",
          label: "Color",
          render: ({ value, onChange }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Button Color"
            />
          ),
        } as any,
        size: {
          type: "radio",
          label: "Size",
          options: [
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" }
          ]
        },
        fullWidth: {
          type: "select",
          label: "Full Width",
          options: [
            { value: true, label: "True" },
            { value: false, label: "False" }
          ]
        },
        disableElevation: {
          type: "select",
          label: "Disable Elevation",
          options: [
            { value: true, label: "True" },
            { value: false, label: "False" }
          ]
        }
      }
    }
  },
  defaultProps: {
    heading: "Write your Headline here",
    subheading: "Lorem ipsum dolor sit amet...",
    buttons: defaultButtons,
    backgroundColor: "#1976d2",
    headingColor: "#ffffff",
    subheadingColor: "#e0e0e0"
  },
  render: (props: HeroSectionProps) => <HeroSection {...props} />,
};
