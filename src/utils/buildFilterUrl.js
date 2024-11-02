function buildFilterURL(filters) {
  const params = new URLSearchParams();

  if (filters.size && filters.size.length > 0) {
    filters.size.forEach((size) => params.append('size', size));
  }
  if (filters.sex && filters.sex.length > 0) {
    filters.sex.forEach((sex) => params.append('sex', sex));
  }
  if (filters.specie && filters.specie.length > 0) {
    filters.specie.forEach((specieId) => params.append('specieId', specieId));
  }
  if (filters.lostDateRange) {
    const [lostDateMin, lostDateMax] = filters.lostDateRange;
    if (lostDateMin) params.append('lostDateMin', lostDateMin.toISOString());
    if (lostDateMax) params.append('lostDateMax', lostDateMax.toISOString());
  }
  return params.toString();
}

export default buildFilterURL;
