import { Link } from "react-router-dom";
const ArticleCard = ({ article }) => {
  return (
    <li className="articlecard">
      <p className="topic">
        In{" "}
        <Link to={`/topics/${article.topic}`} className="link black">
          <span> {article.topic}</span>
        </Link>
      </p>
      <p className="postedBy">
        Posted by <span>{article.author}</span> on{" "}
        {new Date(article.created_at).toDateString()}{" "}
      </p>
      <Link to={`/articles/${article.article_id}`} className="link black">
        <h3 className="article-title">{article.title}</h3>
      </Link>
    </li>
  );
};
export default ArticleCard;