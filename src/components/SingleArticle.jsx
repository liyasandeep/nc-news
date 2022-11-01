import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";

import * as API from "../api";
const SingleArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState("");

  const { article_id } = useParams();
  useEffect(() => {
    setIsLoading(true);

    API.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="article-info">
      <p className="topic">
        In{" "}
        <Link to={`/topics/${article.topic}`} className="link black">
          <span> {article.topic}</span>
        </Link>
      </p>
      <p className="postedBy">
        Posted by <strong>{article.author}</strong> on{" "}
        {new Date(article.created_at).toDateString()}{" "}
      </p>
      <h3 className="article-title">{article.title}</h3>
      <p className="article-body">{article.body}</p>

      <div className="comment-vote-container">
        <span className="comment">
          <FaRegCommentAlt /> {article.comment_count} <strong>Comments</strong>
        </span>
        <span>
          {article.votes} <strong>Votes</strong>
        </span>
      </div>
    </div>
  );
};
export default SingleArticle;
