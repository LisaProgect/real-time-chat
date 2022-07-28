import React, { createContext } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => (
    <AuthContext.Provider value="Lisa">{children}</AuthContext.Provider>
);

export { AuthContextProvider, AuthContext };
