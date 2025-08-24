import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SharedModal from '../components/modals/SharedModal';

describe('SharedModal', () => {
  it('renders content and closes on overlay click', () => {
    const onClose = vi.fn();

    render(
      <SharedModal isOpen={true} onClose={onClose}>
        Modal Content
      </SharedModal>
    );

    expect(screen.getByText(/Modal Content/i)).toBeInTheDocument();

    const overlay = document.querySelector('.modal-overlay');
    if (!overlay) throw new Error('Overlay not found');

    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on Escape key', () => {
    const onClose = vi.fn();

    render(
      <SharedModal isOpen={true} onClose={onClose}>
        Modal Content
      </SharedModal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
