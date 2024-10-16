/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = import.meta.env.VITE_API_URL;

// Función para crear usuario
export const createUser = async (user) => {
  try {
    const newUser = {
      id: uuidv4(),
      ...user, // Spread operator para incluir el resto de las propiedades
    };

    const response = await axios.post(`${BASE_URL}/users`, newUser);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Función para obtener id de usuario por correo
export const getUserIdByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?email=${email}`);
    const users = response.data;
    return users.length > 0 ? users[0].id : null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
  }
};
