import React from 'react';
import '../cssComponents/resultsList.css';

export type Person = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
};

interface ResultsListProps {
  results: Person[];
  loading: boolean;
  error: string | null;
}

export class ResultsList extends React.Component<ResultsListProps> {
  render() {
    const { results, loading, error } = this.props;
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    return (
      <ul className="results-list">
        {results.map((person) => (
          <li key={person.name} className="result-item">
            <strong>{person.name}</strong> — {person.birth_year} —{' '}
            {person.gender}
          </li>
        ))}
      </ul>
    );
  }
}
