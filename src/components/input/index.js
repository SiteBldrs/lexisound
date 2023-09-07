import React from "react";

import "./input.scss";
import { SearchIcon } from "constants/icons";

export const InputComponent = ({
  searchValue,
  setSearchValue,
  isLoading,
  handleSearchWord,
}) => {
  return (
    <div className="input_container">
      <form onSubmit={handleSearchWord} className="input_holder relative">
        <input
          placeholder="Search for a word"
          type="text"
          name="text"
          id="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
          disabled={isLoading}
          style={{
            maxWidth: searchValue && "100%",
          }}
        />
        {searchValue.trim() && <SearchIcon className="absolute" />}
      </form>
    </div>
  );
};
