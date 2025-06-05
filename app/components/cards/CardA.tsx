import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Box,
  Link as MuiLink,
} from '@mui/material';

export interface CardAProps {
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  readMoreUrl: string;
  authorName: string;
  authorAvatar: string;
}

export const CardA = ({
  date,
  tag,
  title,
  excerpt,
  readMoreUrl,
  authorName,
  authorAvatar,
}: CardAProps) => {
  return (
    <Card
      sx={{
        maxWidth: 720,
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
        <Chip
          label={tag}
          size="small"
          sx={{
            fontWeight: 'bold',
            bgcolor: 'grey.700',
            color: 'common.white',
            '&:hover': {
              bgcolor: 'grey.600',
            },
          }}
        />
      </Box>

      <CardContent sx={{ px: 0 }}>
        <MuiLink
          href={readMoreUrl}
          underline="hover"
          sx={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            display: 'block',
            mt: 1,
            color: 'text.primary',
            '&:hover': { color: 'text.secondary' },
          }}
        >
          {title}
        </MuiLink>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {excerpt}
        </Typography>
      </CardContent>

      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MuiLink
          href={readMoreUrl}
          color="primary"
          underline="hover"
          fontWeight={500}
        >
          Read more
        </MuiLink>
        <Box display="flex" alignItems="center">
          <Avatar
            src={authorAvatar}
            alt={authorName}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography variant="body2" fontWeight={600}>
            {authorName}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export const CardAConfig = {
  label: 'Article Card',
  fields: {
    date: { type: 'text', label: 'Publish Date' },
    tag: { type: 'text', label: 'Tag' },
    title: { type: 'text', label: 'Title' },
    excerpt: { type: 'text', label: 'Excerpt' },
    readMoreUrl: { type: 'text', label: 'Read More Link' },
    authorName: { type: 'text', label: 'Author Name' },
    authorAvatar: { type: 'text', label: 'Author Avatar URL' },
  },
  defaultProps: {
    date: 'Mar 10, 2019',
    tag: 'Design',
    title: 'Accessibility tools for designers and developers',
    excerpt:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque.',
    readMoreUrl: '#',
    authorName: 'Alpha Num Erik',
    authorAvatar:
      'https://images.unsplash.com/photo-1502980426475-b83966705988?auto=format&fit=crop&w=40&q=80',
  },
  render: (props: CardAProps) => <CardA {...props} />,
};
