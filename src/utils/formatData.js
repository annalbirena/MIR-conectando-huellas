export const getSexName = (sex) => {
  if (sex === 'female') {
    return 'Hembra';
  }

  return 'Macho';
};

export const getSizeName = (size) => {
  if (size === 'small') {
    return 'Pequeño';
  }

  if (size === 'medium') {
    return 'Mediano';
  }

  return 'Grande';
};

export const getAgeName = (ageUnit) => {
  if (ageUnit === 'month') {
    return 'Meses';
  }

  return 'Años';
};

export const getLostStateName = (status) => {
  if (status) {
    return 'Perdido';
  }

  return 'Encontrado';
};

export const getAdoptionStateName = (status) => {
  if (status) {
    return 'En Adopción';
  }

  return 'Adoptado';
};

export const formatLostDate = (date) => {
  const formatDate = date.slice(0, 10);

  return formatDate;
};

export const getSpecieById = (data, id) => {
  const item = data.find((obj) => obj.value === id);
  return item ? item.label : '-';
};
