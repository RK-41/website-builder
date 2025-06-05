// Script to create html file with css for a page built with the puck editor
// Generated files are in generatedWithScript directory

import React from 'react';
import { renderToString } from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Render } from '@measured/puck';
import config from './puck.config';
import data from './database.json';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  console.log('🚀 Starting the rendering process...');

  const cache = createCache({ key: 'css', prepend: true });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  console.log('🧩 Cache and Emotion Server created.');

  const tsx = (
    <CacheProvider value={cache}>
      <Render config={config} data={data['/']} />
    </CacheProvider>
  );

  console.log('🔍 Rendering to string...');

  const html = renderToString(tsx);

  console.log('📦 Extracting critical CSS...');

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Puck Page</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      ${emotionCss}
    </head>
    <body>
      <div id="render-root">${html}</div>
      <script src="render-bundle.js"></script>
    </body>
    </html>
`;

  console.log('💾 Saving html file...');

  const dirPath = path.join(process.cwd(), 'public');
  const filePath = path.join(dirPath, 'test.html');
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, htmlContent);

  console.log(`🍀 HTML exported to ${filePath}`);
}

main();
