import React, { createContext, useState } from 'react';

export const UserAddedContext = createContext();

export const UserAddedProvider = ({ children }) => {
    const [userAdded, setUserAdded] = useState(false);

    const handleUserAdded = () => {
        setUserAdded(prev => !prev);
    }

    return (
        <UserAddedContext.Provider value={handleUserAdded}>
            {children}
        </UserAddedContext.Provider>
    )
}