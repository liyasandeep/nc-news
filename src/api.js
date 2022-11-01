import axios from "axios";
const myApi = axios.create({
  baseURL: "https://nc-news-be-liya.herokuapp.com/api",
});

export const getAllArticles = (topic, sort_by, order) => {
  return myApi
    .get("/articles", {
      params: {
        topic: topic,
        sory_by: sort_by,
        order: order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};
export const getAllTopics = () => {
  return myApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};
