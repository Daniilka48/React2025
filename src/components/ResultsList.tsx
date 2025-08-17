'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleItem } from '../store/selectedItemsSlice';
import '../cssComponents/resultsList.css';
import { useTranslations } from 'next-intl';

export type Person = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  url: string;
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
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);

  const t = useTranslations();

  if (loading) return <div className="loading">{t('details_loading')}</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <ul className="results-list">
      {results.map((person, index) => {
        const isSelected = selectedItems.some(
          (item) => item.url === person.url
        );

        return (
          <li
            key={person.name}
            className={`result-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onItemClick(index)}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                dispatch(toggleItem(person));
              }}
            />
            <strong>{person.name}</strong> — {person.birth_year} —{' '}
            {person.gender}
          </li>
        );
      })}
    </ul>
  );
};
