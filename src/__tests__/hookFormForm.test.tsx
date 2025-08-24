import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { describe, expect, it } from 'vitest';
import HookFormForm from '../components/forms/HookFormForm';

describe('HookFormForm', () => {
  it('рендерит и валидирует поля при пустом сабмите', async () => {
    const { container } = render(
      <Provider store={store}>
        <HookFormForm onClose={() => {}} />
      </Provider>
    );

    const form = container.querySelector('form');

    if (!form) throw new Error('Form not found');

    fireEvent.submit(form);

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Age is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Confirm your password/i)).toBeInTheDocument();
      expect(screen.getByText(/Select a gender/i)).toBeInTheDocument();
      expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/You must accept the Terms and Conditions/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Image is required/i)).toBeInTheDocument();
    });
  });
});
