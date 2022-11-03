import { Link } from "react-router-dom";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import * as API from "../api";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const ArticleCard = ({ article }) => {
  const [voteChangeValue, setVoteChangeValue] = useState(0);
  const handleVoteIncreaseClick = (article_id) => {
    setVoteChangeValue((currVote) => currVote + 1);

    API.updateArticleVote(article_id, 1).catch((err) => {
      setVoteChangeValue((currVote) => currVote - 1);
      toast.error("OOPS!!!, Something went wrong, please try again later");
    });
  };

  const handleVoteDecreaseClick = (article_id) => {
    setVoteChangeValue((currVote) => currVote - 1);

    API.updateArticleVote(article_id, -1).catch((err) => {
      setVoteChangeValue((currVote) => currVote + 1);
      toast.error("OOPS!!!, Something went wrong, please try again later");
    });
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <li className="articlecard">
        <p className="topic">
          In{" "}
          <Link to={`/topics/${article.topic}`} className="link black">
            <strong> {article.topic}</strong>
          </Link>
        </p>
        <p className="postedBy">
          Posted by <strong>{article.author}</strong> on{" "}
          {new Date(article.created_at).toDateString()}{" "}
        </p>
        <Link to={`/articles/${article.article_id}`} className="link black">
          <h3 className="article-title">{article.title}</h3>
        </Link>

        <div className="comment-vote-container">
          <span className="comment">
            <FaRegCommentAlt /> {article.comment_count}
            <Link to={`/articles/${article.article_id}`} className="link black">
              {" "}
              <strong>Comments</strong>
            </Link>
          </span>
          <span>
            {article.votes + voteChangeValue} <strong>Votes</strong>
          </span>

          <button
            disabled={voteChangeValue === 1}
            onClick={() => handleVoteIncreaseClick(article.article_id)}
            className="votebtn"
          >
            <BiUpvote />
          </button>

          <button
            disabled={voteChangeValue === -1}
            onClick={() => handleVoteDecreaseClick(article.article_id)}
            className="votebtn"
          >
            <BiDownvote />
          </button>
        </div>
      </li>
    </>
  );
};
export default ArticleCard;
