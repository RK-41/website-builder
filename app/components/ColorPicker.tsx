import React from 'react';
import { ComponentConfig } from '@measured/puck';
import { MuiColorInput } from 'mui-color-input'; // or any MUI-compatible color picker

type ColorPickerProps = {
  color: string;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ color }) => (
  <button style={{ background: color, color: '#fff', padding: 8 }}>
    {color}
  </button>
);

export const ColorPickerConfig: ComponentConfig<ColorPickerProps> = {
  label: 'Button with Color Picker',
  fields: {
    color: {
      type: 'custom',
      label: 'Color',
      render: ({ value, onChange }: { value: any; onChange: any }) => (
        <MuiColorInput value={value} onChange={onChange} label="Pick a color" />
      ),
    },
  },
  defaultProps: {
    color: '#1976d2',
  },
  render: (props) => <ColorPicker {...props} />,
};
