import React from 'react';
import '../cssComponents/PersonDetails.css';
import { useGetCharacterByIdQuery } from '../store/apiSlice';
import { useTranslations } from 'next-intl';

interface PersonDetailsProps {
  id: string;
  onClose: () => void;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ id, onClose }) => {
  const {
    data: person,
    isLoading,
    error,
    refetch,
  } = useGetCharacterByIdQuery(id);

  const t = useTranslations();

  if (isLoading)
    return <div className="details-loading">{t('details_loading')}</div>;
  if (error) {
    return (
      <div className="details error">
        Error loading data.
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  }
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
      <button onClick={() => refetch()}>Update</button>
    </div>
  );
};

export default PersonDetails;
