import React, { useEffect, useState } from 'react';
import '../cssComponents/PersonDetails.css';

interface PersonDetailsProps {
  id: string;
  onClose: () => void;
}

interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ id, onClose }) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPerson(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

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
