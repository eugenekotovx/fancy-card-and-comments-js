import axios from "axios";
import { randomPostId } from "./helpers.js";

const commentApi = axios.create({
  baseURL: `https://5f996fae50d84900163b8a4f.mockapi.io/comments/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

let randomNum = randomPostId();

export const getCardInfo = () => {
  return commentApi.get("/post/" + randomNum);
};
