import React, { createContext, useState } from 'react';
import { Auth } from 'aws-amplify';

export const AuthContext = createContext({
  user: null, // Provide default values
  checkLoggedIn: () => {},
  signIn: () => {},
  signOut: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const checkLoggedIn = async () => {
        try {
            console.log("going through authentification")
            const userInfo = await Auth.currentAuthenticatedUser();
            console.log(userInfo);
            setUser(userInfo);
        } catch (error) {
            setUser(null);
            console.log("Error: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, checkLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};