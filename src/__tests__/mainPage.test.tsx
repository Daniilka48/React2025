import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import MainPage from '../pages/MainPage';
import { expect, it } from 'vitest';

it('renders MainPage', () => {
  render(
    <Provider store={store}>
      <MainPage />
    </Provider>
  );

  expect(screen.getByText(/React Forms App/i)).toBeInTheDocument();
  expect(screen.getByText(/Open Uncontrolled Form/i)).toBeInTheDocument();
  expect(screen.getByText(/Open React Hook Form/i)).toBeInTheDocument();
});
