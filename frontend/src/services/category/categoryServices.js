import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//Add Category
export const addCategoryAPI = async ({ name, type }) => {
  const token = getUserFromStorage();
  const response = await axios.post(
    `${BASE_URL}/categories/create`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //return a promise
  return response.data;
};

//List Category
export const listCategoriesAPI = async () => {
  const token = getUserFromStorage();
  const response = await axios.get(`${BASE_URL}/categories/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //return a promise
  return response.data;
};

//Update Category
export const updateCategoryAPI = async ({ name, type, id }) => {
  const token = getUserFromStorage();
  const response = await axios.put(
    `${BASE_URL}/categories/update/${id}`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //return a promise
  return response.data;
};

//Delete Category
export const deleteCategoryAPI = async (id) => {
  const token = getUserFromStorage();
  const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return the promise
  return response.data;
};
