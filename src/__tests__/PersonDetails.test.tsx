import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PersonDetails from '../components/PersonDetails';

describe('PersonDetails', () => {
  const mockPerson = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state initially', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));

    render(<PersonDetails id="1" onClose={() => {}} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders person data after fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPerson,
    } as Response);

    render(<PersonDetails id="1" onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        (_, element) => element?.textContent === 'Birth Year: 19BBY'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, element) => element?.textContent === 'Gender: male')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === 'Height: 172 cm'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, element) => element?.textContent === 'Mass: 77 kg')
    ).toBeInTheDocument();
  });

  it('renders error state on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    render(<PersonDetails id="999" onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
