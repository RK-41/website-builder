import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
} from "@mui/material";

export interface CardCProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  price: string;
}

// Component definition
export const CardC = ({
  image,
  title,
  description,
  rating,
  price,
}: CardCProps) => (
  <Card
    sx={{
      display: "flex",
      maxWidth: 500,
      borderRadius: 3,
      overflow: "hidden",
      bgcolor: "background.paper",
      boxShadow: 4,
    }}
  >
    <Box
      sx={{
        width: "35%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <CardContent sx={{ width: "65%", p: 3 }}>
      <Typography variant="h6" fontWeight="bold" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={1}>
        {description}
      </Typography>

      <Box mt={1}>
        <Rating value={rating} precision={0.5} readOnly />
      </Box>

      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          {price}
        </Typography>
        <Button size="small" variant="contained" sx={{ textTransform: "uppercase" }}>
          Add to Cart
        </Button>
      </Box>
    </CardContent>
  </Card>
);

// Puck config with separate render component
export const CardCConfig = {
  label: "Product Card",
  fields: {
    image: { type: "text", label: "Image URL" },
    title: { type: "text", label: "Title" },
    description: { type: "text", label: "Description" },
    rating: { type: "number", label: "Rating", min: 0, max: 5, step: 0.5 },
    price: { type: "text", label: "Price" },
  },
  defaultProps: {
    image:
      "https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?auto=format&fit=crop&w=334&q=80",
    title: "Backpack",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In odit.",
    rating: 3,
    price: "$220",
  },
  render: (props: CardCProps) => <CardC {...props} />,
};
