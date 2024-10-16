/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// Función para consultar mascotas perdidas
export const getLostPets = async () => {
  const URL = `${BASE_URL}/pets?type=lost`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching lost pets:', error);
  }
};

// Función para consultar mascotas en Adopción
export const getAdoptPets = async () => {
  const URL = `${BASE_URL}/pets?type=adoption`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching adoption pets:', error);
  }
};

// Función para consultar mascota perdida por ID
export const getLostPetById = async (id) => {
  const URL = `${BASE_URL}/pets/${id}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching pet:', error);
  }
};

// Función para consultar mascota en adopcion por ID
export const getAdoptPetById = async (id) => {
  const URL = `${BASE_URL}/pets/${id}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching pet:', error);
  }
};

// Función para agregar una nueva mascota perdida
export const createLostPet = async (data) => {
  const URL = `${BASE_URL}/pets`;
  try {
    const response = await axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding pet:', error);
    return null;
  }
};

// Función para agregar una nueva mascota en adopcion
export const createAdoptPet = async (data) => {
  const URL = `${BASE_URL}/pets`;
  try {
    const response = await axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding pet:', error);
    return null;
  }
};
