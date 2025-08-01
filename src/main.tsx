import ErrorBoundary from './components/ErrorBoundary.tsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './store/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}

createRoot(rootElement).render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);
