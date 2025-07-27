import React, { useState, useEffect } from 'react';
import '../cssComponents/Search.css';

interface SearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const Search: React.FC<SearchProps> = ({ searchTerm, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue.trim());
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="search-input"
        placeholder="Enter character name..."
      />
      <button onClick={handleSearchClick} className="search-button">
        Search
      </button>
    </div>
  );
};
