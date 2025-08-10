import ErrorBoundary from './components/ErrorBoundary.tsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider.tsx';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}

createRoot(rootElement).render(
  <Provider store={store}>
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>
);
