import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import * as API from "../api";
import ArticleCard from "../components/ArticleCard";
import SortAndOrderSection from "./SortAndOrderSection";

const ListAllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);
  const [selectSortValue, setSelectSortValue] = useState("created_at");
  const [selectOrderValue, setSelectOrderValue] = useState("desc");

  const { topicName } = useParams();

  useEffect(() => {
    setIsLoading(true);

    API.getAllArticles(topicName, selectSortValue, selectOrderValue).then(
      (articles) => {
        setArticleList(articles);
        setIsLoading(false);
      }
    );
  }, [topicName, selectSortValue, selectOrderValue]);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <section className="article-list">
      {topicName ? (
        <>
          <h2> Articles in {`${topicName}`}</h2>
          <SortAndOrderSection
            selectSortValue={selectSortValue}
            setSelectSortValue={setSelectSortValue}
            selectOrderValue={selectOrderValue}
            setSelectOrderValue={setSelectOrderValue}
          />
        </>
      ) : (
        <>
          <h2>All Articles</h2>
          <SortAndOrderSection
            selectSortValue={selectSortValue}
            setSelectSortValue={setSelectSortValue}
            selectOrderValue={selectOrderValue}
            setSelectOrderValue={setSelectOrderValue}
          />
        </>
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
