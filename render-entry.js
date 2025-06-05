// Entry script for the webpack config

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Render } from '@measured/puck';
import config from './puck.config.tsx';
import data from './database.json';

console.log('🍀Entry file is running');

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('render-root');
  if (!rootElement) throw new Error('Root element not found');

  console.log('🫠Root element:', rootElement);
  const root = createRoot(rootElement);

  root.render(<Render config={config} data={data['/']} />);
});
