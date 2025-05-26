import React from 'react';
import { Box, Container, Divider, Typography, Link, Stack, IconButton } from '@mui/material';
import { Facebook, GitHub, Reddit } from '@mui/icons-material';

export const iconMap = {
  Facebook: <Facebook fontSize="small" />,
  GitHub: <GitHub fontSize="small" />,
  Reddit: <Reddit fontSize="small" />,
};

type FooterProps = {
  logo: {
    src: string;
    alt: string;
    href: string;
  };
  navLinks: {
    label: string;
    href: string;
  }[];
  socialLinks: {
    icon: keyof typeof iconMap;
    label: string;
    href: string;
  }[];
  copyright: string;
};

export const Footer = ({
  logo,
  navLinks,
  socialLinks,
  copyright,
}: FooterProps) => {
  return (
    <Box component="footer" bgcolor="white" color="text.secondary" py={8} className="dark:bg-gray-900 dark:text-gray-300">
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={2} textAlign="center">
          <Link href={logo.href}>
            <img src={logo.src} alt={logo.alt} className="h-7 w-auto" />
          </Link>

          <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={2} mt={2}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                variant="body2"
                underline="hover"
                sx={{
                  mx: 1,
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: { xs: 4, md: 6 }, borderColor: 'divider' }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            {copyright}
          </Typography>

          <Stack direction="row" spacing={1}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                aria-label={social.label}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                {iconMap[social.icon]}
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export const FooterConfig = {
  label: 'Footer',
  fields: {
    logo: {
      label: 'Logo',
      type: 'object',
      fields: {
        src: { label: 'Image URL', type: 'text' },
        alt: { label: 'Alt Text', type: 'text' },
        href: { label: 'Link URL', type: 'text' },
      },
    },
    navLinks: {
      label: 'Navigation Links',
      type: 'array',
      getItemSummary: (item: any) => item.label,
      arrayFields: {
        label: { label: 'Label', type: 'text' },
        href: { label: 'Link URL', type: 'text' },
      },
    },
    socialLinks: {
      label: 'Social Links',
      type: 'array',
      getItemSummary: (item: any) => item.label,
      arrayFields: {
        label: { label: 'Label', type: 'text' },
        href: { label: 'Link URL', type: 'text' },
        icon: {
          label: 'Icon',
          type: 'select',
          options: [
            { value: 'Facebook', label: 'Facebook' },
            { value: 'GitHub', label: 'GitHub' },
            { value: 'Reddit', label: 'Reddit' },
          ],
        },
      },
    },
    copyright: {
      label: 'Copyright Text',
      type: 'text',
    },
  },
  defaultProps: {
    logo: {
      src: 'https://merakiui.com/images/full-logo.svg',
      alt: 'Logo',
      href: '#',
    },
    navLinks: [
      { label: 'Home', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Teams', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
    socialLinks: [
      { icon: 'Reddit', label: 'Reddit', href: '#' },
      { icon: 'Facebook', label: 'Facebook', href: '#' },
      { icon: 'GitHub', label: 'GitHub', href: '#' },
    ],
    copyright: '© Copyright 2021. All Rights Reserved.',
  },
  render: (props) => <Footer {...props} />,
};
