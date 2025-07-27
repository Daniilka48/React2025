import React from 'react';
import usePersonDetails from '../hooks/usePersonDetails';

interface PersonDetailsProps {
  id: string;
  onClose: () => void;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ id, onClose }) => {
  const { person, loading, error } = usePersonDetails(id);

  if (loading) return <div className="details-loading">Loading...</div>;
  if (error) return <div className="details-error">Error: {error}</div>;
  if (!person) return null;

  return (
    <div className="details-container">
      <button onClick={onClose} className="close-button">
        X
      </button>
      <h2>{person.name}</h2>
      <p>
        <strong>Birth Year:</strong> {person.birth_year}
      </p>
      <p>
        <strong>Gender:</strong> {person.gender}
      </p>
      <p>
        <strong>Height:</strong> {person.height} cm
      </p>
      <p>
        <strong>Mass:</strong> {person.mass} kg
      </p>
    </div>
  );
};

export default PersonDetails;
