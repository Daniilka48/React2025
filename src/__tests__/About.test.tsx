import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../pages/About';

describe('About Page', () => {
  it('renders developer information', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Daniil Terekhin/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Graduate of Lipetsk State Technical University/i)
    ).toBeInTheDocument();

    const img = screen.getByAltText(/Daniil Terekhin/i) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/daniil2\.jpg$/);

    expect(screen.getByRole('link', { name: /rs\.school/i })).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );

    expect(
      screen.getByRole('link', { name: /github\.com\/daniilka48/i })
    ).toHaveAttribute('href', 'https://github.com/daniilka48');

    expect(
      screen.getByRole('link', { name: /Back to Search/i })
    ).toHaveAttribute('href', '/');
  });
});
