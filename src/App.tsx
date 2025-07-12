import { Component } from 'react';
import { Search } from './components/Search';
import { ResultsList } from './components/ResultsList';
import type { Person } from './components/ResultsList';

type AppState = {
  searchTerm: string;
  results: Person[];
  loading: boolean;
  error: string | null;
};

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchTerm: '',
    results: [],
    loading: false,
    error: null,
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
    const { searchTerm, results, loading, error } = this.state;

    return (
      <div>
        <Search searchTerm={searchTerm} onSearch={this.handleSearch} />
        <ResultsList results={results} loading={loading} error={error} />
        <button
          onClick={() => {
            throw new Error('Test error');
          }}
        >
          Throw Error
        </button>
      </div>
    );
  }
}

export default App;
