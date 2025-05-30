import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';

// Define a separate interface for button props
interface SubmitButtonProps {
  text: string;
  textColor?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disableElevation?: boolean;
}

export const defaultSubmitButton: SubmitButtonProps = {
  text: "Submit",
  textColor: "#ffffff",
  color: "#1976d2",
  size: 'large',
  fullWidth: true,
  disableElevation: false,
}

export interface ContactSectionProps {
  heading: string;
  description: string;
  formHeading?: string;
  firstNameLabel?: string;
  lastNameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  messageLabel?: string;
  backgroundColor?: string;
  formBackgroundColor?: string;
  submitButton?: SubmitButtonProps;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  heading,
  description,
  formHeading = "Contact Us",
  firstNameLabel = "Enter your first name.",
  lastNameLabel = "Enter your last name.",
  emailLabel = "Enter your email ID.",
  phoneLabel = "+91 Mobile Number",
  messageLabel = "Write your Message here.",
  backgroundColor = '#f4f4f4',
  formBackgroundColor = '#f4f4f4',
  submitButton = defaultSubmitButton,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted!', formData);

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Response from server:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/test');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        console.log('API Call res', result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Destructure individual button props from submitButtonProps with explicit typing
  const { text, textColor, color, size, fullWidth, disableElevation }: SubmitButtonProps = submitButton;

  return (
    <Box
      component="section"
      sx={{
        bgcolor: backgroundColor,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side: Headline and Description */}
          <Grid component="div" size={{ xs: 12, md: 6 }}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 2 }}
              >
                {heading}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ mb: 4 }}
              >
                {description}
              </Typography>
            </Box>
          </Grid>

          {/* Right Side: Form */}
          <Grid component="div" size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, bgcolor: formBackgroundColor }}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {formHeading && (
                  <Typography variant="h5" component="h3" gutterBottom>
                    {formHeading}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label={firstNameLabel}
                  variant="outlined"
                  size="medium"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label={lastNameLabel}
                  variant="outlined"
                  size="medium"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label={emailLabel}
                  type="email"
                  variant="outlined"
                  size="medium"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {/* Phone field with placeholder as label */}
                <TextField
                  fullWidth
                  label={phoneLabel}
                  variant="outlined"
                  size="medium"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label={messageLabel}
                  variant="outlined"
                  size="medium"
                  multiline
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size={size}
                  fullWidth={fullWidth}
                  disableElevation={disableElevation}
                  sx={{
                    mt: 2,
                    ...(color ? { bgcolor: color, color: textColor || 'white' } : {}),
                    ...(textColor ? { color: textColor } : {}),
                  }}
                >
                  {text}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export const ContactSectionConfig = {
  label: "Contact Section",
  fields: {
    heading: { type: "text", label: "Left Side Heading" },
    description: { type: "textarea", label: "Left Side Description" },
    formHeading: { type: "text", label: "Form Heading" },
    firstNameLabel: { type: "text", label: "First Name Field Label" },
    lastNameLabel: { type: "text", label: "Last Name Field Label" },
    emailLabel: { type: "text", label: "Email Field Label" },
    phoneLabel: { type: "text", label: "Phone Field Label" },
    messageLabel: { type: "textarea", label: "Message Field Label" },
    submitButton: {
      type: "object",
      label: "Submit Button",
      objectFields: {
        text: { type: "text", label: "Text" },
        textColor: {
          type: "custom",
          label: "Text Color Field",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Text Color"
            />
          ),
        } as any,
        color: {
          type: "custom",
          label: "Button Color Field",
          render: ({ value, onChange }: { value: any, onChange: any }) => (
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
      } as any
    },
    backgroundColor: {
      type: "custom",
      label: "Background Color",
      render: ({ value, onChange }: { value: any, onChange: any }) => (
        <MuiColorInput
          value={value}
          onChange={onChange}
          label="Background Color"
        />
      ),
    } as any,
    formBackgroundColor: {
      type: "custom",
      label: "Form Background Color",
      render: ({ value, onChange }: { value: any, onChange: any }) => (
        <MuiColorInput
          value={value}
          onChange={onChange}
          label="Form Background Color"
        />
      ),
    } as any,
  },
  defaultProps: {
    heading: "Write your Headline here",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.",
    formHeading: "Get in Touch",
    firstNameLabel: "Enter your first name.",
    lastNameLabel: "Enter your last name.",
    emailLabel: "Enter your email ID.",
    phoneLabel: "+91 Mobile Number",
    messageLabel: "Write your Message here.",
    submitButton: defaultSubmitButton,
    backgroundColor: '#f4f4f4',
    formBackgroundColor: '#f4f4f4',
  },
  render: (props: ContactSectionProps) => <ContactSection {...props} />,
}; 