import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Stack,
  IconButton,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LocationOn, Phone, Language } from '@mui/icons-material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export interface ProfileProps {
  name: string;
  email: string;
  avatarUrl: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export const ProfileCard: React.FC<ProfileProps> = ({
  name,
  email,
  avatarUrl,
  bio,
  location,
  phone,
  website,
  social,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={3}
        alignItems="center"
        justifyContent="center"
      >
        <Avatar src={avatarUrl} alt={name} sx={{ width: 100, height: 100 }} />
        <Box textAlign={isMobile ? 'center' : 'left'}>
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
          {bio && (
            <Typography variant="body1" mt={1}>
              {bio}
            </Typography>
          )}
          <Stack
            direction="row"
            spacing={1}
            mt={2}
            justifyContent={isMobile ? 'center' : 'flex-start'}
          >
            {location && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocationOn fontSize="small" />
                <Typography variant="body2">{location}</Typography>
              </Stack>
            )}
            {phone && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Phone fontSize="small" />
                <Typography variant="body2">{phone}</Typography>
              </Stack>
            )}
            {website && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Language fontSize="small" />
                <Link href={website} target="_blank" rel="noopener">
                  {website}
                </Link>
              </Stack>
            )}
          </Stack>
          {social && (
            <Stack direction="row" spacing={1} mt={2}>
              {social.twitter && (
                <IconButton
                  component="a"
                  href={social.twitter}
                  target="_blank"
                  rel="noopener"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </IconButton>
              )}
              {social.linkedin && (
                <IconButton
                  component="a"
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </IconButton>
              )}
              {social.github && (
                <IconButton
                  component="a"
                  href={social.github}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </IconButton>
              )}
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export const ProfileConfig = {
  label: 'Profile',
  fields: {
    name: { type: 'text', label: 'Full Name', defaultValue: 'John Doe' },
    email: {
      type: 'text',
      label: 'Email',
      defaultValue: 'john.doe@example.com',
    },
    avatarUrl: {
      type: 'text',
      label: 'Avatar URL',
      defaultValue: 'https://i.pravatar.cc/150?img=3',
    },
    bio: {
      type: 'text',
      label: 'Bio',
      defaultValue:
        'Passionate developer with a love for creating intuitive user experiences.',
    },
    location: {
      type: 'text',
      label: 'Location',
      defaultValue: 'San Francisco, CA',
    },
    phone: { type: 'text', label: 'Phone', defaultValue: '+1 (555) 123-4567' },
    website: {
      type: 'text',
      label: 'Website',
      defaultValue: 'https://johndoe.dev',
    },
    social: {
      type: 'object',
      label: 'Social Links',
      fields: {
        twitter: {
          type: 'text',
          label: 'Twitter',
          defaultValue: 'https://twitter.com/johndoe',
        },
        linkedin: {
          type: 'text',
          label: 'LinkedIn',
          defaultValue: 'https://linkedin.com/in/johndoe',
        },
        github: {
          type: 'text',
          label: 'GitHub',
          defaultValue: 'https://github.com/johndoe',
        },
      },
    },
  },
  defaultProps: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    bio: 'Passionate developer with a love for creating intuitive user experiences.',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    website: 'https://johndoe.dev',
    social: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  },
  render: (props: ProfileProps) => <ProfileCard {...props} />,
};
