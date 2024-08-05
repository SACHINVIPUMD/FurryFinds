import React from 'react';
import './Search.css';
import { BsSearch } from 'react-icons/bs';

const Search = ({ searchVal, setSearchVal, handleSearch }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchVal}
        onChange={e => setSearchVal(e.target.value)} 
        onKeyDown={handleKeyDown} 
      />
      <BsSearch className="search-icon" onClick={handleSearch} />
    </div>
  );
};

export default Search;
