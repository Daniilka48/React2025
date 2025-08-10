import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Layout from '../layout/Layout';

vi.mock('../components/ThemeSwitcher', () => {
  return {
    default: () => <div data-testid="theme-switcher">ThemeSwitcher</div>,
  };
});

describe('Layout', () => {
  it('рендерит ссылки и ThemeSwitcher', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<div>Главная страница</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );

    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();

    expect(screen.getByText('Главная страница')).toBeInTheDocument();
  });
});
