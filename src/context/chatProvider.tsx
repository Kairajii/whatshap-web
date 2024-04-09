import React, { createContext, useContext, useState } from "react";


const SelectedUserContext = createContext();
export const useSelectedUser = () => useContext(SelectedUserContext);

export const SelectedUserProvider = ({ children } :any) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};
