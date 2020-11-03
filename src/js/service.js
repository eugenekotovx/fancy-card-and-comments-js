import axios from "axios";

const commentApi = axios.create({
  baseURL: `https://5f996fae50d84900163b8a4f.mockapi.io/comments/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

let randomPostId = () => {
  var num = Math.floor(Math.random() * 10)
  return num;
};

export const getComments = () => {
  return commentApi.get("/comments");
};

const getPost = () => {
  return commentApi.get("/post/" + randomPostId());
};
