import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './../store/selectedItemsSlice';
import { ResultsList } from './../components/ResultsList';
import type { SelectedItem } from './../store/selectedItemsSlice';

const mockResults: SelectedItem[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.py4e.com/api/people/1/',
  },
];

const createMockStore = (items: SelectedItem[]) => {
  const preloadedState = {
    selectedItems: {
      items,
    },
  };

  return configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
    preloadedState,
  });
};

describe('ResultsList Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state', () => {
    const store = createMockStore([mockResults[0]]);
    render(
      <Provider store={store}>
        <ResultsList
          results={[]}
          loading={true}
          error={null}
          onItemClick={() => {}}
        />
      </Provider>
    );
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    const store = createMockStore([mockResults[0]]);
    render(
      <Provider store={store}>
        <ResultsList
          results={[]}
          loading={false}
          error="Network error"
          onItemClick={() => {}}
        />
      </Provider>
    );
    expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
  });

  it('renders character list', () => {
    const store = createMockStore([mockResults[0]]);
    render(
      <Provider store={store}>
        <ResultsList
          results={mockResults}
          loading={false}
          error={null}
          onItemClick={() => {}}
        />
      </Provider>
    );
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  });

  it('checkbox is checked when item is selected', () => {
    const store = createMockStore([mockResults[0]]);
    render(
      <Provider store={store}>
        <ResultsList
          results={mockResults}
          loading={false}
          error={null}
          onItemClick={() => {}}
        />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('dispatches toggleItem on checkbox change', () => {
    const store = createMockStore([mockResults[0]]);
    const spy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ResultsList
          results={mockResults}
          loading={false}
          error={null}
          onItemClick={() => {}}
        />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(spy).toHaveBeenCalled();
  });
});
