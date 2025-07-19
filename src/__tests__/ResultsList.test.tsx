import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultsList } from '../components/ResultsList';

const mockResults = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
  },
];

describe('ResultsList Component', () => {
  it('renders loading state', () => {
    render(<ResultsList results={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<ResultsList results={[]} loading={false} error="Network error" />);
    expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
  });

  it('renders character list', () => {
    render(<ResultsList results={mockResults} loading={false} error={null} />);
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  });
});
