import React, {useRef } from "react";

const SearchBar = (props) => {

  return (
    <div className="form-group">
      <input
        id={props.id}
        onChange={props.onChange}
        className="form-control search-bar"
        placeholder={props.placeholder}
        ref={props.ref}
      />
    </div>
  );
};

export default SearchBar;
