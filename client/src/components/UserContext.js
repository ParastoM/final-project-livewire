import styled from "styled-components";
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Step 1: Grab data from storage
  // Step 2: Parse stored data
  // Step 3: If data exists, return it. Else return null.

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = window.sessionStorage.getItem("currentUser");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
