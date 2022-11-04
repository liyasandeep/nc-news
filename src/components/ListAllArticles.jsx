import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from "../api";
import ArticleCard from "../components/ArticleCard";
import SortAndOrderSection from "./SortAndOrderSection";
import ErrorPage from "./ErrorPage";

const ListAllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);
  const [error, setError] = useState(null);
  const [selectSortValue, setSelectSortValue] = useState("created_at");
  const [selectOrderValue, setSelectOrderValue] = useState("desc");

  const { topicName } = useParams();

  useEffect(() => {
    setIsLoading(true);
    API.getAllArticles(topicName, selectSortValue, selectOrderValue)
      .then((articles) => {
        setArticleList(articles);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
            status,
          },
        } = err;

        setError({ message, status });
        setIsLoading(false);
      });
  }, [topicName, selectSortValue, selectOrderValue]);
  return isLoading ? (
    <p>Loading ...</p>
  ) : error ? (
    <ErrorPage message={error.message} status={error.status} />
  ) : (
    <section className="article-list">
      {topicName ? (
        <h2> Articles in {`${topicName}`}</h2>
      ) : (
        <h2>All Articles</h2>
      )}
      <SortAndOrderSection
        selectSortValue={selectSortValue}
        setSelectSortValue={setSelectSortValue}
        selectOrderValue={selectOrderValue}
        setSelectOrderValue={setSelectOrderValue}
      />
      <ul>
        {articleList.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};
export default ListAllArticles;
