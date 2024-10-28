/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../services/user';
import { getSpecies } from '../services/pets';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [species, setSpecies] = useState([]);

  const getUser = async (id) => {
    const userData = await getUserById(id);
    setUser(userData);
  };

  useEffect(() => {
    // Guardar token y userId
    const id = localStorage.getItem('userId');
    const tokenId = localStorage.getItem('token');
    setUserId(id);
    setToken(tokenId);

    // Obtener especies
    const fetchSpecies = async () => {
      const speciesData = await getSpecies();
      const formatData = speciesData.reduce(
        (acc, curr) => [
          ...acc,
          {
            value: curr.id,
            label: curr.name,
          },
        ],
        [],
      );

      setSpecies(formatData);
    };

    fetchSpecies();
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
    species,
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
