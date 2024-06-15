import axios from 'axios';

const API_URL = 'https://test.taxivoshod.ru/api/test/';

export const getFilters = async () => {
  const response = await axios.get(`${API_URL}?w=catalog-filter`);
  return response.data;
};

export const getCars = async (filters: any, page: number) => {
  const filterParams = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    filters[key].forEach((value: any) => filterParams.append(`${key}[]`, value));
  });
  const url = `${API_URL}?w=catalog-cars&${filterParams.toString()}&page=${page}`;
  const response = await axios.get(url);
  console.log('Данные:', response.data);
  return response.data;
};

export const getCarById = async (id: number) => {
  const response = await axios.get(`${API_URL}?w=catalog-car&id=${id}`);
  return response.data;
};
