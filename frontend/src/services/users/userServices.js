import axios from "axios";
import { BASE_URL } from "../../utils/url";

//LOGIN
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
  //return a promise
  return response.data;
};

//Register
export const registerAPI = async ({ email, password, username }) => {
  const response = await axios.post(`${BASE_URL}/users/register`, {
    email,
    password,
    username,
  });
  //return a promise
  return response.data;
};
