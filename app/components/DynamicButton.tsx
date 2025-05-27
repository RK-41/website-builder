import React from "react";
import { ComponentConfig } from "@measured/puck";
import Button from "@mui/material/Button";

// Button component props type
type DynamicButtonProps = {
  text: string;
  variant: "contained" | "outlined" | "text";
  colorType: "predefined" | "custom";
  color?: string;
  size: "small" | "medium" | "large";
  fullWidth: boolean;
  disableElevation: boolean;
};

// Button component using Material UI
export const DynamicButton: React.FC<DynamicButtonProps> = ({
  text,
  variant,
  colorType,
  color,
  size,
  fullWidth,
  disableElevation,
}) => {
  // For custom color, use sx. For predefined, use color prop.
  const buttonProps: any = {
    variant,
    size,
    fullWidth,
    disableElevation,
    children: text,
  };

  if (colorType === "predefined" && color) {
    buttonProps.color = color;
  } else if (colorType === "custom" && color) {
    buttonProps.sx = {
      backgroundColor: color,
      color: "#fff",
      "&:hover": {
        backgroundColor: color,
        opacity: 0.9,
      },
    };
    // Use "contained" for custom colors to ensure background is visible
    if (!variant || variant === "text") {
      buttonProps.variant = "contained";
    }
  }

  return <Button {...buttonProps} />;
};

// Default button data
const defaultButton: DynamicButtonProps = {
  text: "Click me",
  variant: "contained",
  colorType: "custom",
  color: "#0000ff",
  size: "medium",
  fullWidth: false,
  disableElevation: false,
};

// Puck config for Button with dynamic fields
export const DynamicButtonConfig: ComponentConfig<DynamicButtonProps> = {
  label: "Dynamic Button",
  fields: {
    text: { type: "text", label: "Text" },
    variant: {
      type: "radio",
      label: "Variant",
      options: [
        { value: "contained", label: "Contained" },
        { value: "outlined", label: "Outlined" },
        { value: "text", label: "Text" },
      ],
    },
    // color field will be dynamically resolved below
    size: {
      type: "radio",
      label: "Size",
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
      ],
    },
    fullWidth: {
      type: "select",
      label: "Full Width",
      options: [
        { value: true, label: "True" },
        { value: false, label: "False" },
      ],
    },
    disableElevation: {
      type: "select",
      label: "Disable Elevation",
      options: [
        { value: true, label: "True" },
        { value: false, label: "False" },
      ],
    },
    colorType: {
      type: "radio",
      label: "Color Type",
      options: [
        { value: "custom", label: "Custom" },
        { value: "predefined", label: "Predefined" },
      ],
    },
  },

  // resolveFields dynamically changes the color field based on colorType
  resolveFields: (data) => {
    const baseFields = { ...DynamicButtonConfig.fields };
    baseFields.color =
      data.props.colorType === "custom"
        ? {
          type: "text",
          label: "Custom Color (hex or CSS)",
        }
        : {
          type: "select",
          label: "Predefined Color",
          options: [
            { value: "primary", label: "Primary" },
            { value: "secondary", label: "Secondary" },
            { value: "error", label: "Error" },
            { value: "warning", label: "Warning" },
            { value: "info", label: "Info" },
            { value: "success", label: "Success" },
            { value: "inherit", label: "Inherit" },
          ],
        };
    return baseFields;
  },

  defaultProps: defaultButton,

  render: (props) => <DynamicButton {...props} />,
};
