import React from 'react';
import { Tabs, Tab, Box, SvgIcon, Typography } from '@mui/material';

export interface TabItem {
  label: string;
  icon: string; // SVG path
}

export interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: number;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
}) => {
  const [value, setValue] = React.useState(activeTab);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto' }}>
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ minHeight: 48 }}
      >
        {tabs.map((tab, idx) => (
          <Tab
            key={idx}
            icon={
              <SvgIcon fontSize="small" sx={{ mr: 1 }}>
                <path d={tab.icon} />
              </SvgIcon>
            }
            label={
              <Typography variant="body2" whiteSpace="nowrap">
                {tab.label}
              </Typography>
            }
            sx={{ minHeight: 48, px: 2 }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export const TabNavigationConfig = {
  label: 'Tab Navigation',
  fields: {
    activeTab: {
      label: 'Active Tab Index',
      type: 'number',
    },
    tabs: {
      label: 'Tabs',
      type: 'array',
      getItemSummary: (item: any) => item.label,
      arrayFields: {
        label: { label: 'Label', type: 'text' },
        icon: {
          label: 'Icon Path',
          type: 'text',
          helperText: 'Paste SVG path string (inside <path d="..." />)',
        },
      },
    },
  },
  defaultProps: {
    activeTab: 0,
    tabs: [
      {
        label: 'Profile',
        icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2',
      },
      {
        label: 'Account',
        icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
      },
      {
        label: 'Notification',
        icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      },
    ],
  },
  render: (props: TabNavigationProps) => <TabNavigation {...props} />,
};

export default TabNavigationConfig;
