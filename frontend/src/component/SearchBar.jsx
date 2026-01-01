

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="border-top border-bottom bg-light text-center py-3">
      
      {/* Search Box */}
      <div className="d-inline-flex align-items-center justify-content-center border rounded-pill px-4 py-2 my-3 mx-2 w-75 w-md-50">
        
        <input
          type="text"
          className="form-control border-0 shadow-none bg-transparent small"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <i className="bi bi-search ms-2 text-secondary"></i>
      </div>

      {/* Close Icon */}
      <div>
        <i
          className="bi bi-x-lg cursor-pointer"
          style={{ cursor: 'pointer', fontSize: '14px' }}
          onClick={() => setShowSearch(false)}
        ></i>
      </div>

    </div>
  );
};

export default SearchBar;