import { useEffect, useState } from "react";
import * as API from "../api";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";

const ListRecentArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    API.getAllArticles()
      .then((articles) => {
        const first10Articles = articles.slice(0, 10);
        setArticleList(first10Articles);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.response) {
          const {
            response: {
              data: { message },
              status,
            },
          } = err;

          setError({ message, status });
        } else {
          const message = err.message;
          setError({ message });
        }
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : error ? (
    <ErrorPage message={error.message} status={error.status} />
  ) : (
    <section className="article-list">
      <h2>Recent Articles</h2>
      <ul>
        {articleList.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};
export default ListRecentArticles;
