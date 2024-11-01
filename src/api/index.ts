import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getTodosSWR = async (url: string) => {
  const res = await axiosInstance.get(url);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return res.data;
};

export const getTodos = async (params: { _page: string; _limit: string }) => {
  const queryString = new URLSearchParams(params);

  const res = await axiosInstance.get(`/todos?${queryString}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return res.data;
};
