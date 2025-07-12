import React from 'react';

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
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}
