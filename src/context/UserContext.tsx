"use client"

import React, {createContext, useState, ReactNode, useCallback, useContext} from 'react';
import {getUserByToken} from "@/lib/user";
import User from "@/interfaces/User";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  getUser: (token: string) => Promise<User | null> | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  getUser: (_: string) => null
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const getUser = useCallback(getUserByToken, []);


  // useEffect(() => {
  //   fetch(`${baseUrl}/api/current-user`)
  //     .then(response => response.json())
  //     .then(function (data) {
  //       return setUser(data.currentUser);
  //     })
  //     .catch(error => console.error(error));
  // }, [baseUrl]);


  return (
    <UserContext.Provider value={{user, setUser, getUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useAuthContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

