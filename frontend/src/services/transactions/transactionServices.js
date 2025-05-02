import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//Add Category
export const addTransactionAPI = async ({
  type,
  amount,
  category,
  date,
  description,
}) => {
  const token = getUserFromStorage();
  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    {
      type,
      amount,
      category,
      date,
      description,
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

//List transactions
export const listTransactionsAPI = async () => {
  const token = getUserFromStorage();
  const response = await axios.get(`${BASE_URL}/transactions/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //Return a promise
  return response.data;
};
