import React, { useState, useEffect, useContext, createContext } from "react";

const GenreContext = createContext();
const GenreContextDispatcher = createContext();

const GenreProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return (
    <GenreContext.Provider value={state}>
      <GenreContextDispatcher.Provider value={setState}>
        {children}
      </GenreContextDispatcher.Provider>
    </GenreContext.Provider>
  );
};

export default GenreProvider;

export const useGenre = () => useContext(GenreContext);
export const useGenreAction = () => useContext(GenreContextDispatcher);
