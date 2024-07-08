import React from 'react';
import ReactDOM from 'react-dom/client';
import Drawing from '@lib/Drawing';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Drawing />
);
