import React from 'react';
import '../cssComponents/Search.css';

interface SearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export class Search extends React.Component<SearchProps> {
  state = {
    inputValue: this.props.searchTerm,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.inputValue.trim());
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          className="search-input"
          placeholder="Enter character name..."
        />
        <button onClick={this.handleSearchClick} className="search-button">
          Search
        </button>
      </div>
    );
  }
}
