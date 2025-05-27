import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Button,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';

interface SectionButton {
  text: string;
  href: string;
  variant?: 'contained' | 'outlined' | 'text';
  textColor?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disableElevation?: boolean;
}

export interface CategoriesProps {
  heading: string;
  subheading: string;
  headline: string;
  description: string;
  sectionButtons: SectionButton[];
  sectionImage: string;
  backgroundColor: string;
}

const defaultSectionButtons: SectionButton[] = [
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
    textColor: "#1976d2",
    color: "#1976d2",
    size: "large",
    fullWidth: false,
    disableElevation: false,
  },
];

export const Categories: React.FC<CategoriesProps> = ({
  heading,
  subheading,
  headline,
  description,
  sectionButtons = defaultSectionButtons,
  sectionImage,
  backgroundColor
}) => {
  return (
    <Box component="section" sx={{ bgcolor: backgroundColor }}>
      {/* First Section: All Categories */}
      <Box
        sx={{
          py: 8, // Padding top and bottom
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              mb: 2,
            }}
          >
            {heading}
          </Typography>

          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              mb: 4,
            }}
          >
            {subheading}
          </Typography>
        </Container>
      </Box>

      {/* Second Section: Image and Text */}
      <Box
        sx={{
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{
                pr: { md: 4 },
                margin: 'auto',
              }}>
                <Typography
                  variant="h4"
                  component="h3"
                  fontWeight="bold"
                  gutterBottom
                >
                  {headline}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    mb: 4,
                  }}
                >
                  {description}
                </Typography>
                <Stack direction="row" spacing={2}>
                  {sectionButtons.map((button, index) => (
                    <Button
                      key={index}
                      variant={button.variant}
                      href={button.href}
                      size={button.size}
                      fullWidth={button.fullWidth}
                      disableElevation={button.disableElevation}
                      sx={{
                        ...(button.color ?
                          (button.variant === 'contained' ? { bgcolor: button.color, color: button.textColor || 'white' } : { color: button.color, borderColor: button.color })
                          : {}),
                        ...(button.textColor && button.variant !== 'contained' ? { color: button.textColor } : {}),
                      }}
                    >
                      {button.text}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src={sectionImage}
                alt="Section Image"
                sx={{
                  display: 'block',
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 1,
                  margin: 'auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export const CategoriesConfig = {
  label: "Categories Section",
  fields: {
    heading: { type: "text", label: "First Section Heading" },
    subheading: { type: "textarea", label: "First Section Subheading" },
    headline: { type: "text", label: "Second Section Heading" },
    description: { type: "textarea", label: "Second Section Subheading" },
    sectionButtons: {
      type: "array",
      label: "Second Section Buttons",
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
          label: "Text Color",
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
          label: "Button Color",
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
    },
    sectionImage: { type: "text", label: "Second Section Image URL" },
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
  },
  defaultProps: {
    heading: "All Categories",
    subheading: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.",
    headline: "Write your Headline here",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor",
    sectionButtons: defaultSectionButtons,
    sectionImage: "https://edmingle.b-cdn.net/edmingle_websitebuilder/sitebuilder/assets/designs/images/edmingle/meeting-clipped.png",
    backgroundColor: "#ffffff"
  },
  render: (props: CategoriesProps) => <Categories {...props} />,
};
