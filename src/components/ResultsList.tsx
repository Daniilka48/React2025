import React from 'react';

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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
      <ul>
        {results.map((person) => (
          <li key={person.name}>
            <strong>{person.name}</strong> — {person.birth_year} —{' '}
            {person.gender}
          </li>
        ))}
      </ul>
    );
  }
}
