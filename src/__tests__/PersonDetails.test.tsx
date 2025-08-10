import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonDetails from '../components/PersonDetails';
import type { MockedFunction } from 'vitest';

vi.mock('../store/apiSlice', () => ({
  useGetCharacterByIdQuery: vi.fn(),
}));

import { useGetCharacterByIdQuery } from '../store/apiSlice';

type UseGetCharacterByIdQueryReturn = ReturnType<
  typeof useGetCharacterByIdQuery
>;

describe('PersonDetails', () => {
  const mockPerson = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (
      useGetCharacterByIdQuery as unknown as MockedFunction<
        typeof useGetCharacterByIdQuery
      >
    ).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: vi.fn(),
      isFetching: true,
      isSuccess: false,
      isError: false,
      status: 'pending',
    } as UseGetCharacterByIdQueryReturn);

    render(<PersonDetails id="1" onClose={() => {}} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders person data after fetch', () => {
    (
      useGetCharacterByIdQuery as unknown as MockedFunction<
        typeof useGetCharacterByIdQuery
      >
    ).mockReturnValue({
      data: mockPerson,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
      isFetching: false,
      isSuccess: true,
      isError: false,
      status: 'fulfilled',
    } as UseGetCharacterByIdQueryReturn);

    render(<PersonDetails id="1" onClose={() => {}} />);

    const birthYearParagraph = screen.getByText('Birth Year:', {
      selector: 'strong',
    }).parentElement;
    expect(birthYearParagraph).toHaveTextContent('Birth Year: 19BBY');

    const genderParagraph = screen.getByText('Gender:', {
      selector: 'strong',
    }).parentElement;
    expect(genderParagraph).toHaveTextContent('Gender: male');

    const heightParagraph = screen.getByText('Height:', {
      selector: 'strong',
    }).parentElement;
    expect(heightParagraph).toHaveTextContent('Height: 172 cm');

    const massParagraph = screen.getByText('Mass:', {
      selector: 'strong',
    }).parentElement;
    expect(massParagraph).toHaveTextContent('Mass: 77 kg');
  });

  it('renders error state on fetch failure and retry button', () => {
    const mockRefetch = vi.fn();

    (
      useGetCharacterByIdQuery as unknown as MockedFunction<
        typeof useGetCharacterByIdQuery
      >
    ).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 404, data: 'Not found' },
      refetch: mockRefetch,
      isFetching: false,
      isSuccess: false,
      isError: true,
      status: 'rejected',
    } as UseGetCharacterByIdQueryReturn);

    render(<PersonDetails id="999" onClose={() => {}} />);

    expect(screen.getByText(/error loading data/i)).toBeInTheDocument();

    const retryButton = screen.getByText(/try again/i);
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalled();
  });
});
