import React, { useState, useEffect, useContext, createContext } from "react";

const TitleMovie = createContext();
const TitleMovieDispatcher = createContext();

const TitleMovieProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return (
    <TitleMovie.Provider value={state}>
      <TitleMovieDispatcher.Provider value={setState}>
        {children}
      </TitleMovieDispatcher.Provider>
    </TitleMovie.Provider>
  );
};

export default TitleMovieProvider;

export const useMovieTitle = () => useContext(TitleMovie);
export const useMovieTitleAction = () => useContext(TitleMovieDispatcher);
