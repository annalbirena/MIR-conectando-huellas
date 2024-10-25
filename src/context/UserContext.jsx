/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../services/user';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const getUser = async (id) => {
    const userData = await getUserById(id);
    setUser(userData);
  };

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const tokenId = localStorage.getItem('token');
    setUserId(id);
    setToken(tokenId);
  }, []);

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  const contextValue = {
    userId,
    setUserId,
    user,
    setUser,
    token,
    setToken,
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
