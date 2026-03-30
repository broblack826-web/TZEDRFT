// Fix for "Cannot set property fetch of #<Window> which has only a getter"
(function() {
  try {
    const originalFetch = window.fetch;
    if (originalFetch && !Object.getOwnPropertyDescriptor(window, 'fetch')?.set) {
      Object.defineProperty(window, 'fetch', {
        get: () => originalFetch,
        set: () => { console.warn('Ignored attempt to overwrite window.fetch'); },
        configurable: true
      });
    }
  } catch (e) {}
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
