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
  onItemClick: (index: number) => void;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  results,
  loading,
  error,
  onItemClick,
}) => {
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <ul className="results-list">
      {results.map((person, index) => (
        <li
          key={person.name}
          className="result-item"
          onClick={() => onItemClick(index)}
        >
          <strong>{person.name}</strong> — {person.birth_year} — {person.gender}
        </li>
      ))}
    </ul>
  );
};
