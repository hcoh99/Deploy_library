import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [keyword, setKeyword] = useState("");

  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}