import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/selectedItemsSlice';
import { ThemeProvider } from '../context/ThemeProvider';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          birth_year: '19BBY',
          gender: 'male',
          url: 'https://swapi.py4e.com/api/people/1/',
        },
      ],
    }),
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderWithProviders(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>
  );
}

describe('App Component', () => {
  it('loads and displays results on mount', async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText(/luke skywalker/i)).toBeInTheDocument();
  });

  it('displays error on failed fetch', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Fetch error'));
    renderWithProviders(<App />);
    expect(await screen.findByText(/error: fetch error/i)).toBeInTheDocument();
  });
});
