// app/components/CustomLink.tsx
import React from 'react';
import { ComponentConfig } from '@measured/puck';
import { Link } from '@mui/material';

export interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
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
  sx?: object;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
  variant = 'body1' as CustomLinkProps['variant'],
  color = 'primary',
  underline = 'always',
  sx = {},
}) => {
  return (
    <Link
      href={href}
      underline={underline}
      sx={{
        color: variant === 'contained' ? color : 'inherit',
        ...sx,
      }}
    >
      {children}
    </Link>
  );
};

// Component configuration
export const CustomLinkConfig: ComponentConfig<CustomLinkProps> = {
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
    sx: {
      label: 'Custom Styles',
      type: 'text',
    },
  },
  defaultProps: {
    href: '#',
    children: 'Link Text',
    variant: 'text',
    color: 'primary',
    underline: 'always',
    sx: {},
  },
  render: ({ href, children, variant, color, underline, sx }: CustomLinkProps) => (
    <CustomLink href={href} variant={variant} color={color} underline={underline} sx={sx}>
      {children}
    </CustomLink>
  )
};

export default CustomLinkConfig;