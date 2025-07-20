import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

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
        },
      ],
    }),
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App Component', () => {
  it('loads and displays results on mount', async () => {
    render(<App />);
    expect(await screen.findByText(/luke skywalker/i)).toBeInTheDocument();
  });

  it('displays error on failed fetch', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Fetch error'));
    render(<App />);
    expect(await screen.findByText(/error: fetch error/i)).toBeInTheDocument();
  });
});
