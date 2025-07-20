import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { Component } from 'react';
import type { ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class TestErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

describe('App Component', () => {
  it('throws error and shows fallback UI on button click', () => {
    render(
      <TestErrorBoundary>
        <App />
      </TestErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /throw error/i }));

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
