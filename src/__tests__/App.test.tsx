import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import { ThemeProvider } from '../context/ThemeProvider';
import { store } from '../store/store';

function renderWithProviders(initialEntries: string[]) {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
}

describe('App routing', () => {
  it('renders layout and main page on root path "/"', () => {
    renderWithProviders(['/']);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders About page on /about route', () => {
    renderWithProviders(['/about']);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it('renders NotFound page on unknown route', () => {
    renderWithProviders(['/some/unknown/path']);
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });

  it('renders MainPage with details view when detailsId param is set', () => {
    renderWithProviders(['/page/1/details/5']);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
