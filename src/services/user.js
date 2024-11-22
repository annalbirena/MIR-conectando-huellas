/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = import.meta.env.VITE_API_URL;

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

// Actualizar datos de usuario
export const updateUser = async (userId, data, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
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
    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

// Función para verificar cuenta
export const verifyAccount = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/verify/${token}`);
    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};
