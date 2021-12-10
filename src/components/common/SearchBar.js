import React, { useState } from 'react';
import SearchBar from 'material-ui-search-bar';

const SearchBarComponent = ({ handleSearch, title }) => {
  const [searchTxt, setSearchTxt] = useState('');
  return (
    <SearchBar
      value={searchTxt}
      onChange={(newValue) => {
        setSearchTxt(newValue);
        handleSearch(newValue);
      }}
      placeholder={title || 'search'}
      onCancelSearch={() => handleSearch('')}
      style={{ boxShadow: 'none', border: '1px solid #ccc' }}
    />
  );
};

export default SearchBarComponent;
