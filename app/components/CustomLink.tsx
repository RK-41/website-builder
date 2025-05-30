import React from 'react';
import { ComponentConfig } from '@measured/puck';
import { Link } from '@mui/material';

export type CustomLinkProps = {
  href: string;
  children: string; // Changed to string for Puck compatibility
  variant?: 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'
  | string;
  color?: 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'textPrimary'
  | 'textSecondary'
  | 'textDisabled'
  | string;
  underline?: 'always' | 'hover' | 'none';
  // sx is not configurable via Puck in this example
}

export const CustomLink = ({
  href,
  children,
  variant = 'body1',
  color = 'primary',
  underline = 'always',
}: CustomLinkProps) => {
  return (
    <Link
      href={href}
      underline={underline}
      sx={{
        color: variant === 'contained' ? color : 'inherit',
      }}
    >
      {children}
    </Link>
  );
};

export const CustomLinkConfig = {
  label: 'Custom Link',
  fields: {
    href: {
      label: 'URL',
      type: 'text',
    },
    children: {
      label: 'Text',
      type: 'text',
    },
    variant: {
      label: 'Variant',
      type: 'radio',
      options: [
        { value: 'body1', label: 'Body 1' },
        { value: 'body2', label: 'Body 2' },
        { value: 'button', label: 'Button' },
        { value: 'caption', label: 'Caption' },
        { value: 'h1', label: 'H1' },
        { value: 'h2', label: 'H2' },
        { value: 'h3', label: 'H3' },
        { value: 'h4', label: 'H4' },
        { value: 'h5', label: 'H5' },
        { value: 'h6', label: 'H6' },
        { value: 'inherit', label: 'Inherit' },
        { value: 'overline', label: 'Overline' },
        { value: 'subtitle1', label: 'Subtitle 1' },
        { value: 'subtitle2', label: 'Subtitle 2' },
        { value: 'text', label: 'Text' },
        { value: 'outlined', label: 'Outlined' },
        { value: 'contained', label: 'Contained' },
      ],
    },
    color: {
      label: 'Color',
      type: 'select',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'success', label: 'Success' },
        { value: 'error', label: 'Error' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'textPrimary', label: 'Text Primary' },
        { value: 'textSecondary', label: 'Text Secondary' },
        { value: 'textDisabled', label: 'Text Disabled' },
      ],
    },
    underline: {
      label: 'Underline',
      type: 'radio',
      options: [
        { value: 'always', label: 'Always' },
        { value: 'hover', label: 'Hover' },
        { value: 'none', label: 'None' },
      ],
    },
    // sx is not configurable via Puck in this example
  },
  defaultProps: {
    href: '#',
    children: 'Link Text',
    variant: 'body1', // Changed to a valid variant
    color: 'primary',
    underline: 'always' as const,
  },
  render: (props: CustomLinkProps) => (
    <CustomLink {...props} />
  )
};

export default CustomLinkConfig;
