import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  api,
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
} from '../store/apiSlice';

function setupApiStore(apiInstance: typeof api) {
  const getStore = () =>
    configureStore({
      reducer: {
        [apiInstance.reducerPath]: apiInstance.reducer,
      },
      middleware: (gDM) => gDM().concat(apiInstance.middleware),
    });

  const store = getStore();

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, wrapper };
}

describe('RTK Query API with vitest', () => {
  const storeRef = setupApiStore(api);

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches characters list', async () => {
    const mockResponse = {
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
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const { result } = renderHook(
      () => useGetCharactersQuery({ page: 1, search: '' }),
      {
        wrapper: storeRef.wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockResponse);
  });

  it('fetches character by id', async () => {
    const mockPerson = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.py4e.com/api/people/1/',
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockPerson), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const { result } = renderHook(() => useGetCharacterByIdQuery('1'), {
      wrapper: storeRef.wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockPerson);
  });

  it('handles error state', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ detail: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const { result } = renderHook(() => useGetCharacterByIdQuery('999'), {
      wrapper: storeRef.wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
