import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../App';

describe('App', () => {
  it('renders MainPage content', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('React Forms App')).toBeInTheDocument();
    expect(screen.getByText('Open Uncontrolled Form')).toBeInTheDocument();
    expect(screen.getByText('Open React Hook Form')).toBeInTheDocument();
  });
});
