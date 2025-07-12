import { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { Search } from './components/Search';
import { ResultsList } from './components/ResultsList';
import type { Person } from './components/ResultsList';

type AppState = {
  searchTerm: string;
  results: Person[];
  loading: boolean;
  error: string | null;
  throwError: boolean;
};

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchTerm: '',
    results: [],
    loading: false,
    error: null,
    throwError: false,
  };

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedTerm }, () => {
      this.fetchData(savedTerm);
    });
  }

  fetchData = async (term: string) => {
    this.setState({ loading: true, error: null });

    const query = term.trim() ? `?search=${term.trim()}&page=1` : '?page=1';

    try {
      const res = await fetch(`https://swapi.dev/api/people/${query}`);
      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      const data = await res.json();
      this.setState({ results: data.results, loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ error: err.message, loading: false });
      } else {
        this.setState({ error: 'Unknown error', loading: false });
      }
    }
  };

  handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.setState({ searchTerm: term });
    this.fetchData(term);
  };

  render() {
    const { searchTerm, results, loading, error, throwError } = this.state;

    if (throwError) {
      throw new Error('Test error');
    }

    return (
      <ErrorBoundary>
        <div>
          <Search searchTerm={searchTerm} onSearch={this.handleSearch} />
          <ResultsList results={results} loading={loading} error={error} />
          <button onClick={() => this.setState({ throwError: true })}>
            Throw Error
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
