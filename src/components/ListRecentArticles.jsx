import { useEffect, useState } from "react";
import * as API from "../api";
import ArticleCard from "../components/ArticleCard";

const ListRecentArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState("");
  useEffect(() => {
    setIsLoading(true);

    API.getAllArticles().then((articles) => {
      const first10Articles = articles.slice(0, 10);
      setArticleList(first10Articles);
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <p>Loading ...</p>
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
