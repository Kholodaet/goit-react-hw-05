import { useState } from "react";

export const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query === "") {
      return;
    }
    onSearch(query);
    setQuery("");
  };

  const handleInput = (event) => {
    setQuery(event.target.value.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="inputSearch" value={query} onChange={handleInput} />
      <button type="submit">Search movie</button>
    </form>
  );
};
