'use client';

import React from 'react';
import type { Data } from '@measured/puck';
import { Render } from '@measured/puck';
import config from '../../puck.config';

export function Client({ data }: { data: Data }) {
  return <Render config={config} data={data} />;

  // const cache = createCache({ key: "css", prepend: true });

  // return (<CacheProvider value={cache}>
  // <Render config={config} data={data} />
  // </CacheProvider>)
}
