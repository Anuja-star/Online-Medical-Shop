import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Get the root element from public/index.html
const container = document.getElementById('root');
const root = createRoot(container);

// Render the main App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);