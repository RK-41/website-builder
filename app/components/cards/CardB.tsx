import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Box,
  Link as MuiLink,
} from "@mui/material";

export interface CardBProps {
  image: string;
  tag: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  href: string;
}

export const CardB = ({
  image,
  tag,
  title,
  excerpt,
  authorName,
  authorAvatar,
  date,
  href,
}: CardBProps) => {
  return (
    <Card
      sx={{
        maxWidth: 720,
        overflow: "hidden",
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <CardMedia component="img" image={image} height="260" sx={{ objectFit: "cover" }} />

      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="caption"
          color="primary"
          fontWeight={600}
          textTransform="uppercase"
        >
          {tag}
        </Typography>

        <MuiLink
          href={href}
          underline="hover"
          variant="h6"
          fontWeight="bold"
          color="text.primary"
          display="block"
          mt={1}
          sx={{ "&:hover": { color: "text.secondary" } }}
        >
          {title}
        </MuiLink>

        <Typography variant="body2" color="text.secondary" mt={1}>
          {excerpt}
        </Typography>

        <Box mt={3} display="flex" alignItems="center" gap={1}>
          <Avatar src={authorAvatar} alt={authorName} sx={{ width: 40, height: 40 }} />
          <Typography fontWeight={500} color="text.primary">
            {authorName}
          </Typography>
          <Typography variant="caption" color="text.secondary" ml={1}>
            {date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export const CardBConfig = {
  label: "Blog Post Card",
  fields: {
    image: { type: "text", label: "Cover Image URL" },
    tag: { type: "text", label: "Tag" },
    title: { type: "text", label: "Title" },
    excerpt: { type: "text", label: "Excerpt" },
    authorName: { type: "text", label: "Author Name" },
    authorAvatar: { type: "text", label: "Author Avatar URL" },
    date: { type: "text", label: "Date" },
    href: { type: "text", label: "Read More Link" },
  },
  defaultProps: {
    image:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=500&q=60",
    tag: "Product",
    title: "I Built A Successful Blog In One Year",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel.",
    authorName: "Jone Doe",
    authorAvatar:
      "https://images.unsplash.com/photo-1586287011575-a23134f797f9?auto=format&fit=crop&w=48&q=60",
    date: "21 SEP 2015",
    href: "#",
  },
  render: (props: CardBProps) => <CardB {...props} />,
};
