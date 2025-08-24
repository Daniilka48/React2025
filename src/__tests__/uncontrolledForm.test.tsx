import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as utils from '../utils/fileToBase64';
import { store } from '../store/store';
import UncontrolledForm from '../components/forms/UncontrolledForm';

vi.spyOn(utils, 'fileToBase64').mockImplementation(() =>
  Promise.resolve('data:image/png;base64,mockimage')
);

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('UncontrolledForm', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders all form fields', () => {
    render(<UncontrolledForm onClose={onClose} />, { wrapper: Wrapper });

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture/i)).toBeInTheDocument();
  });

  it('shows validation errors if required fields are empty', async () => {
    render(<UncontrolledForm onClose={onClose} />, { wrapper: Wrapper });

    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(alertMock.mock.calls[0][0]).toContain('Name is required');
    });

    alertMock.mockRestore();
  });

  it('submits form with valid data', async () => {
    render(<UncontrolledForm onClose={onClose} />, { wrapper: Wrapper });

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: 30 } });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'male' },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: 'USA' },
    });
    fireEvent.click(screen.getByLabelText(/Accept Terms/i));

    const file = new File(['dummy'], 'photo.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Picture/i) as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => expect(onClose).toHaveBeenCalled());

    const state = store.getState().forms.uncontrolled;
    expect(state).toHaveLength(1);
    expect(state[0].name).toBe('John');
    expect(state[0].picture).toBe('data:image/png;base64,mockimage');
  });
});
