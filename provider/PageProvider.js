import React, { useState, useEffect, useContext, createContext } from "react";

const PageContext = createContext();
const PageContextDispatcher = createContext();

const PageProvider = ({ children }) => {
  const [state, setState] = useState(1);

  return (
    <PageContext.Provider value={state}>
      <PageContextDispatcher.Provider value={setState}>
        {children}
      </PageContextDispatcher.Provider>
    </PageContext.Provider>
  );
};

export default PageProvider;

export const usePage = () => useContext(PageContext);
export const usePageAction = () => useContext(PageContextDispatcher);
