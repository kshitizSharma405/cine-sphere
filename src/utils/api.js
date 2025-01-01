import axios from "axios";

const API_KEY = process.env.REACT_APP_CINESPHERE_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

const api = axios.create({
  baseURL: BASE_URL,
  params: { apikey: API_KEY },
});

export const fetchMoviesBySearch = async (query, page = 1) => {
  const { data } = await api.get("", { params: { s: query, page } });
  if (data.Response === "True") return data.Search;
  throw new Error(data.Error);
};

export const fetchMovieDetails = async (id) => {
  const { data } = await api.get("", { params: { i: id, plot: "full" } });
  return data;
};

export default api;
