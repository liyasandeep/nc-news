import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from "../api";
import ArticleCard from "../components/ArticleCard";

const ListAllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState("");
  const { topicName } = useParams();

  useEffect(() => {
    setIsLoading(true);

    API.getAllArticles(topicName).then((articles) => {
      setArticleList(articles);
      setIsLoading(false);
    });
  }, [topicName]);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <section className="article-list">
      {topicName ? (
        <h2> Articles in {`${topicName}`}</h2>
      ) : (
        <h2>All Articles</h2>
      )}
      <ul>
        {articleList.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};
export default ListAllArticles;
