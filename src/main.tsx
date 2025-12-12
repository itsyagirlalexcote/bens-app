import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for debugging
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} catch (error) {
  console.error('Error initializing app:', error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: system-ui;">
        <h1>Error Loading App</h1>
        <p>There was an error initializing the application.</p>
        <pre>${error instanceof Error ? error.message : String(error)}</pre>
        <p>Check the browser console for more details.</p>
      </div>
    `;
  }
}

