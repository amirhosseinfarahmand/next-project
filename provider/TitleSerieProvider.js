import React, { useState, useEffect, useContext, createContext } from "react";

const TitleSerie = createContext();
const TitleSerieDispatcher = createContext();

const TitleSerieProvider = ({ children }) => {
  const [state, setState] = useState();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <TitleSerie.Provider value={state}>
      <TitleSerieDispatcher.Provider value={setState}>
        {children}
      </TitleSerieDispatcher.Provider>
    </TitleSerie.Provider>
  );
};

export default TitleSerieProvider;

export const useSerieTitle = () => useContext(TitleSerie);
export const useSerieTitleAction = () => useContext(TitleSerieDispatcher);
