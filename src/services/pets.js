/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// Función para consultar mascotas perdidas
export const getLostPets = async () => {
  const URL = `${BASE_URL}/lostpets`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching lost pets:', error);
  }
};

// Función para consultar mascotas perdidas por filtros
export const getLostPetsByFilters = async (filters) => {
  const URL = `${BASE_URL}/lostpets/filters/filter?${filters}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching lost pets by filters:', error);
  }
};

// Función para consultar mascotas en adopcion por filtros
export const getAdoptPetsByFilters = async (filters) => {
  const URL = `${BASE_URL}/adoptionpets/filters/filter?${filters}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching adoption pets by filters:', error);
  }
};

// Función para consultar mascotas en Adopción
export const getAdoptPets = async () => {
  const URL = `${BASE_URL}/adoptionpets`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching adoption pets:', error);
  }
};

// Función para consultar mascota perdida por ID
export const getLostPetById = async (id) => {
  const URL = `${BASE_URL}/lostpets/${id}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching pet:', error);
  }
};

// Función para consultar mascota en adopcion por ID
export const getAdoptPetById = async (id) => {
  const URL = `${BASE_URL}/adoptionpets/${id}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching pet:', error);
  }
};

// Función para agregar una nueva mascota perdida
export const createLostPet = async (data, token) => {
  const URL = `${BASE_URL}/lostpets`;

  try {
    const response = await axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding pet:', error);
    return null;
  }
};

// Función para agregar una nueva mascota en adopcion
export const createAdoptPet = async (data, token) => {
  const URL = `${BASE_URL}/adoptionpets`;
  try {
    const response = await axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding pet:', error);
    return null;
  }
};

// Función para editar mascota perdida
export const updateLostPet = async (id, data, token) => {
  const URL = `${BASE_URL}/lostpets/${id}`;
  try {
    const response = await axios.put(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing pet:', error);
    return null;
  }
};

// Función para editar mascota en adopcion
export const updateAdoptionPet = async (id, data, token) => {
  const URL = `${BASE_URL}/adoptionpets/${id}`;
  try {
    const response = await axios.put(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing pet:', error);
    return null;
  }
};

// Función para consultar mascotas perdidas por usuario
export const getLostPetsByUserId = async (id, token) => {
  const URL = `${BASE_URL}/lostpets/user/${id}`;
  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
  }
};

// Función para consultar mascotas en adopcion por usuario
export const getAdoptionPetsByUserId = async (id, token) => {
  const URL = `${BASE_URL}/adoptionpets/user/${id}`;
  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
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

export const uploadImage = async (path, image, token) => {
  const URL = `${BASE_URL}${path}/upload`;
  try {
    const response = await axios.post(URL, image, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
