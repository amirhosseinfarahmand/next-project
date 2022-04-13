import React, { useState, useEffect, useContext, createContext } from "react";

const SeriesContext = createContext();
const SeriesContextDispatcher = createContext();

const SeriesProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return (
    <SeriesContext.Provider value={state}>
      <SeriesContextDispatcher.Provider value={setState}>
        {children}
      </SeriesContextDispatcher.Provider>
    </SeriesContext.Provider>
  );
};

export default SeriesProvider;

export const useSeries = () => useContext(SeriesContext);
export const useActionSeries = () => useContext(SeriesContextDispatcher);
