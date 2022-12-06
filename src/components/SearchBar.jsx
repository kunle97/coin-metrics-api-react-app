import React from "react";

const SearchBar = (props) => {
  return (
    <div className="form-group">
      <input
        onChange={props.onChange}
        className="form-control search-bar"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default SearchBar;
