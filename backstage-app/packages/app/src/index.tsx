import '@backstage/cli/asset-types';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@backstage/ui/css/styles.css';

// 1. Polyfill MUST be defined before ReactDOM renders the application
if (!globalThis.crypto) {
  // @ts-ignore
  globalThis.crypto = {};
}

if (!globalThis.crypto.randomUUID) {
  // @ts-ignore - Bypass TS2322 UUID template literal return type mismatch
  globalThis.crypto.randomUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }) as any;
  };
}

// 2. Render App only after the polyfill is initialized
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);