import { useEffect, useState } from "react";
import * as API from "../api";
import ArticleCard from "../components/ArticleCard";

const ListAllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState("");
  useEffect(() => {
    setIsLoading(true);

    API.getAllArticles().then((articles) => {
      setArticleList(articles);
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <section className="article-list">
      <h2>All Articles</h2>
      <ul>
        {articleList.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};
export default ListAllArticles;
