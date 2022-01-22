import React, { useState } from 'react';

export const UserContext = React.createContext({
  user: '',
  token: ''
});

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
