import axios from "axios";
const myApi = axios.create({
  baseURL: "https://nc-news-be-liya.herokuapp.com/api",
});

export const getAllArticles = () => {
  return myApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
