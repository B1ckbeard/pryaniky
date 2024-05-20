import { createContext, useState } from 'react';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [context, setContext] = useState({
    token: window.localStorage.getItem('token'),
  });

  const logIn = (token) => {
    window.localStorage.setItem('token', token);
    setContext({ token });
  };

  const logOut = () => {
    setContext({ token: null });
    window.localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{
      ...context, setContext, logIn, logOut,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
