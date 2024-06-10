import { apiToken, baseURL } from "@/constants";
import axios from "axios";

const api = axios.create({
  baseURL,
  headers: {
    Authorization: ["Bearer", apiToken].join(" "),
  },
});

export default api;
