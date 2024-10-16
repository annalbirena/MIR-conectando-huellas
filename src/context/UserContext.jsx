/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUserId(id);
  }, []);

  const contextValue = {
    userId,
    setUserId,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};
