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
export const getArticleById = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};
export const updateArticleVote = (article_id, voteCount) => {
  return myApi
    .patch(`/articles/${article_id}`, { inc_votes: voteCount })
    .then(({ data }) => {
      return data.article;
    });
};

export const getCommentsByArticleId = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
export const postCommentForArticle = (article_id, { author, body }) => {
  return myApi
    .post(`/articles/${article_id}/comments`, {
      username: author,
      body: body,
    })
    .then(({ data }) => {
      return data.comment;
    });
};
