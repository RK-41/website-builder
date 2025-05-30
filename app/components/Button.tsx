import React from 'react';
import { ComponentConfig } from '@measured/puck';
import { Button } from '@mui/material';

export interface PButtonProps {
  text: string;
  variant: 'contained' | 'outlined' | 'text';
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  disableElevation: boolean;
}

const defaultProps: PButtonProps = {
  text: 'Button',
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  fullWidth: false,
  disableElevation: false
}

export const ButtonComponent = ({
  text = defaultProps.text,
  variant = defaultProps.variant,
  color = defaultProps.color,
  size = defaultProps.size,
  fullWidth = defaultProps.fullWidth,
  disableElevation = defaultProps.disableElevation
}: PButtonProps) => (
  <Button variant={variant} color={color} size={size} fullWidth={fullWidth} disableElevation={disableElevation}>
    {text}
  </Button>
)

export const PButton: ComponentConfig<PButtonProps> = {
  label: 'Button',
  fields: {
    text: {
      label: 'Button Text',
      type: 'text'
    },
    variant: {
      label: 'Variant',
      type: 'radio',
      options: [
        { value: 'contained', label: 'Contained' },
        { value: 'outlined', label: 'Outlined' },
        { value: 'text', label: 'Text' }
      ]
    },
    color: {
      label: 'Color',
      type: 'select',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'error', label: 'Error' },
        { value: 'warning', label: 'Warning' },
        { value: 'info', label: 'Info' },
        { value: 'success', label: 'Success' }
      ]
    },
    size: {
      label: 'Size',
      type: 'radio',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
      ]
    },
    fullWidth: {
      type: 'select',
      label: 'Full Width',
      options: [
        { value: true, label: 'True' },
        { value: false, label: 'False' }
      ]
    },
    disableElevation: {
      type: 'select',
      label: 'Disable Elevation',
      options: [
        { value: true, label: 'True' },
        { value: false, label: 'False' }
      ]
    }
  },
  defaultProps: defaultProps,
  render: ({ text, variant, color, size, fullWidth, disableElevation }) => {
    return (
      <Button variant={variant} color={color} size={size} fullWidth={fullWidth} disableElevation={disableElevation}>
        {text}
      </Button>
    );
  }
};