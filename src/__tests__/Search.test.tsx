import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../components/Search';

describe('Search Component', () => {
  it('renders input and button', () => {
    render(<Search searchTerm="" onSearch={() => {}} />);
    expect(
      screen.getByPlaceholderText(/enter character name/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with trimmed input', () => {
    const mockSearch = vi.fn();
    render(<Search searchTerm="" onSearch={mockSearch} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '  Luke  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(mockSearch).toHaveBeenCalledWith('Luke');
  });
});
