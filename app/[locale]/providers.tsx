'use client';

import { Provider } from 'react-redux';
import { store } from '../../src/store/store';
import { ThemeProvider } from '../../src/context/ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
