import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApiBootstrap } from '@deephaven/jsapi-bootstrap';
import {
  preloadTheme,
  ThemeProvider,
  type ThemeData,
} from '@deephaven/components';
import { IrisGridThemeProvider } from '@deephaven/iris-grid';
import './index.css';
import { App } from './App.tsx';

// Preload cached theme variables so that initial render remembers last used theme
preloadTheme();

const jsapiUrl = new URL('http://localhost:10000/jsapi/dh-core.js');
const serverUrl = new URL(jsapiUrl.origin); // Use the same origin as the jsapiUrl
const themes: ThemeData[] = [];

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ApiBootstrap apiUrl={jsapiUrl.href}>
      <ThemeProvider themes={themes}>
        <IrisGridThemeProvider>
          <App serverUrl={serverUrl} />
        </IrisGridThemeProvider>
      </ThemeProvider>
    </ApiBootstrap>
  </StrictMode>
);
