import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import * as API from "../api";

const SingleArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState("");
  const [voteChangeValue, setVoteChangeValue] = useState(0);
  const [error, setError] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    API.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, []);

  const handleVoteIncreaseClick = () => {
    setVoteChangeValue((currVote) => currVote + 1);
    // setError(null);

    API.updateArticleVote(article_id, 1)
      .then((article) => {
        toast.success("Successfully updated vote!");
      })
      .catch((err) => {
        setVoteChangeValue((currVote) => currVote - 1);
        // setError("OOPS!!!, Something went wrong, please try again later");
        toast.error("OOPS!!!, Something went wrong, please try again later");
      });
  };

  const handleVoteDecreaseClick = () => {
    setVoteChangeValue((currVote) => currVote - 1);
    // setError(null);
    API.updateArticleVote(article_id, -1)
      .then((article) => {
        toast.success("Successfully updated vote!");
      })
      .catch((err) => {
        setVoteChangeValue((currVote) => currVote + 1);
        // setError("OOPS!!!, Something went wrong, please try again later");
        toast.error("OOPS!!!, Something went wrong, please try again later");
      });
  };
  if (error) return <Toaster />;

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
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
            <FaRegCommentAlt /> {article.comment_count}{" "}
            <strong>Comments</strong>
          </span>
          <span>
            {article.votes + voteChangeValue} <strong>Votes</strong>
          </span>
          <BiUpvote onClick={handleVoteIncreaseClick} className="votebtn" />

          <BiDownvote onClick={handleVoteDecreaseClick} className="votebtn" />
        </div>
      </div>
    </>
  );
};
export default SingleArticle;
