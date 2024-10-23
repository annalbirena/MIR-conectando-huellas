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
      ...user,
    };

    const response = await axios.post(`${BASE_URL}/users`, newUser);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Función para el usuario por id
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// Función para obtener id de usuario por correo
export const getUserIdByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/email/${email}`);
    const users = response.data;
    return users?.id ? users.id : null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
  }
};

// Función para autenticar usuario
export const authenticateUser = async (email, password) => {
  try {
    const data = {
      email,
      password,
    };
    const response = await axios.post(`${BASE_URL}/users/login`, data);
    const userData = response.data?.user;
    return userData?.id ? userData.id : null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

// Función para consultar todas las especies
export const getSpecies = async () => {
  const URL = `${BASE_URL}/species`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
