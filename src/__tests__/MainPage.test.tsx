import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import MainPage from '../pages/MainPage';
import { store } from '../store/store';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual(
    'react-router-dom'
  )) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import * as ApiSlice from '../store/apiSlice';

vi.mock('../store/apiSlice', async (importOriginal) => {
  const actualModule = (await importOriginal()) as typeof ApiSlice;
  return {
    ...actualModule,
    useGetCharactersQuery: vi.fn(),
  };
});

import { useGetCharactersQuery } from '../store/apiSlice';

describe('MainPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('рендерит список персонажей и обрабатывает поиск', async () => {
    (
      useGetCharactersQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: {
        results: [
          {
            url: 'https://swapi.py4e.com/api/people/1/',
            name: 'Luke Skywalker',
          },
          { url: 'https://swapi.py4e.com/api/people/2/', name: 'C-3PO' },
        ],
      },
      error: null,
      isLoading: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/page/1']}>
          <Routes>
            <Route path="/page/:pageNumber" element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('C-3PO')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Luke Skywalker'));

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining('/details/1')
    );
  });

  it('показывает сообщение об ошибке при ошибке загрузки', () => {
    (
      useGetCharactersQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/page/1']}>
          <Routes>
            <Route path="/page/:pageNumber" element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Ошибка загрузки данных/)).toBeInTheDocument();
  });
});
