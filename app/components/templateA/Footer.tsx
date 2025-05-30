import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { MuiColorInput } from 'mui-color-input';

interface FooterLink {
  text: string;
  href: string;
}

export interface FooterAProps {
  getInTouchHeading: string;
  getInTouchText: string;
  chatHeading: string;
  chatText: string;
  chatEmail: string;
  officeHeading: string;
  officeText: string;
  officeAddress: string;
  phoneHeading: string;
  phoneSchedule: string;
  phoneNumbers: string[];
  copyrightText: string;
  footerLinks: FooterLink[];
  backgroundColor?: string;
  textColor?: string;
}

export const FooterA: React.FC<FooterAProps> = ({
  getInTouchHeading,
  getInTouchText,
  chatHeading,
  chatText,
  chatEmail,
  officeHeading,
  officeText,
  officeAddress,
  phoneHeading,
  phoneSchedule,
  phoneNumbers,
  copyrightText,
  footerLinks,
  backgroundColor = '#0077cc', // Example blue color
  textColor = '#ffffff',
}) => {
  return (
    <Box component="footer" sx={{ bgcolor: backgroundColor, color: textColor, py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Get in touch section */}
          <Grid
            component="div"
            size={{ xs: 12, md: 3 }}
            sx={{
              borderBottom: { xs: '1px solid white', md: 'none' },
              borderRight: { xs: 'none', md: '1px solid white' },
              padding: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {getInTouchHeading}
            </Typography>
            <Typography variant="body2">
              {getInTouchText}
            </Typography>
          </Grid>

          {/* Chat to us section */}
          <Grid component="div" size={{ xs: 12, md: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <EmailOutlinedIcon fontSize="small" />
              <Typography variant="h6" fontWeight="bold">
                {chatHeading}
              </Typography>
            </Stack>
            <Typography variant="body2">
              {chatText}
            </Typography>
            <Link href={`mailto:${chatEmail}`} color="inherit" underline="hover">
              <Typography variant="body2" >
                {chatEmail}
              </Typography>
            </Link>
          </Grid>

          {/* Office section */}
          <Grid component="div" size={{ xs: 12, md: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="h6" fontWeight="bold">
                {officeHeading}
              </Typography>
            </Stack>
            <Typography variant="body2">
              {officeText}
            </Typography>
            <Typography variant="body2">
              {officeAddress}
            </Typography>
          </Grid>

          {/* Phone section */}
          <Grid component="div" size={{ xs: 12, md: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <PhoneOutlinedIcon fontSize="small" />
              <Typography variant="h6" fontWeight="bold">
                {phoneHeading}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {phoneSchedule}
            </Typography>
            <Stack spacing={0.5}>
              {phoneNumbers.map((number, index) => (
                <Link href={`tel:${number.replace(/\s/g, '')}`} color="inherit" underline="hover" key={index}>
                  <Typography variant="body2">
                    {number}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 6, mb: 3, borderColor: textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)' }} />

        {/* Footer bottom */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2">
            {copyrightText}
          </Typography>
          <Stack direction="row" spacing={2}>
            {footerLinks.map((link, index) => (
              <Link href={link.href} color="inherit" underline="hover" key={index}>
                <Typography variant="body2">
                  {link.text}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Stack>

      </Container>
    </Box>
  );
};

export const FooterAConfig = {
  label: "Footer",
  fields: {
    getInTouchHeading: { type: "text", label: "Get in Touch Heading" },
    getInTouchText: { type: "textarea", label: "Get in Touch Text" },
    chatHeading: { type: "text", label: "Chat Heading" },
    chatText: { type: "textarea", label: "Chat Text" },
    chatEmail: { type: "text", label: "Chat Email" },
    officeHeading: { type: "text", label: "Office Heading" },
    officeText: { type: "textarea", label: "Office Text" },
    officeAddress: { type: "textarea", label: "Office Address" },
    phoneHeading: { type: "text", label: "Phone Heading" },
    phoneSchedule: { type: "text", label: "Phone Schedule" },
    phoneNumbers: {
      type: "array",
      label: "Phone Numbers",
      getItemSummary: (item: any) => item,
      arrayFields: {
        value: { type: "text", label: "Phone Number" },
      }
    } as any, // Cast to any to satisfy type checking for now
    copyrightText: { type: "text", label: "Copyright Text" },
    footerLinks: {
      type: "array",
      label: "Footer Links",
      getItemSummary: (item: any) => item.text,
      arrayFields: {
        text: { type: "text", label: "Text" },
        href: { type: "text", label: "URL" },
      }
    },
    textColor: {
      type: "custom",
      label: "Text Color",
      render: ({ value, onChange }: { value: any, onChange: any }) => (
        <MuiColorInput
          value={value}
          onChange={onChange}
          label="Text Color"
        />
      ),
    } as any,
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
  },
  defaultProps: {
    getInTouchHeading: "Get in touch",
    getInTouchText: "We love to hear from you. Our friendly team is always here to chat.",
    chatHeading: "Chat to us",
    chatText: "Our friendly team is here to help.",
    chatEmail: "dummy@edmingle.com",
    officeHeading: "Office",
    officeText: "Come say hello at our office.",
    officeAddress: "Akshya Nagar 1st Block 1st Cross,\nRamamurthy nagar, Bangalore-560016",
    phoneHeading: "Phone",
    phoneSchedule: "Mon - Fri from 8am to 6pm",
    phoneNumbers: ["+91 38574 94827", "+91 81211 21112"],
    copyrightText: "© 2025 Teknas",
    footerLinks: [
      { text: "Courses", href: "#courses" },
      { text: "Contact Us", href: "#contact" },
    ],
    textColor: '#ffffff',
    backgroundColor: '#0077cc',
  },
  render: (props: FooterAProps) => <FooterA {...props} />,
}; 