import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import CommentContainer from "./CommentContainer";
import PostCommentForm from "./PostCommentForm";
import * as API from "../api";
import ErrorPage from "./ErrorPage";
import toast, { Toaster } from "react-hot-toast";

const SingleArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState("");
  const [voteChangeValue, setVoteChangeValue] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [commentCountChange, setCommentCountChange] = useState(0);
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    API.getArticleById(article_id)
      .then((article) => {
        setArticle(article);
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

  useEffect(() => {
    setIsLoading(true);
    API.getCommentsByArticleId(article_id)
      .then((comments) => {
        setCommentList(comments);
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
  }, []);

  const handleVoteIncreaseClick = () => {
    setVoteChangeValue((currVote) => currVote + 1);

    API.updateArticleVote(article_id, 1).catch((err) => {
      toast.error("OOPS!!!,Something went wrong, please try again later");

      setVoteChangeValue((currVote) => currVote - 1);
    });
  };

  const handleVoteDecreaseClick = () => {
    setVoteChangeValue((currVote) => currVote - 1);

    API.updateArticleVote(article_id, -1).catch((err) => {
      toast.error("OOPS!!!,Something went wrong, please try again later");

      setVoteChangeValue((currVote) => currVote + 1);
    });
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : error ? (
    <ErrorPage message={error.message} status={error.status} />
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
            <FaRegCommentAlt />
            {commentCountChange
              ? article.comment_count + commentCountChange
              : article.comment_count}
            <strong> Comments</strong>
          </span>
          <span>
            {article.votes + voteChangeValue} <strong>Votes</strong>
          </span>
          <button
            disabled={voteChangeValue === 1}
            onClick={handleVoteIncreaseClick}
            className="votebtn"
          >
            <BiUpvote />
          </button>
          <button
            disabled={voteChangeValue === -1}
            onClick={handleVoteDecreaseClick}
            className="votebtn"
          >
            <BiDownvote />
          </button>
        </div>
        <PostCommentForm
          article_id={article_id}
          setCommentList={setCommentList}
          setCommentCountChange={setCommentCountChange}
        />
      </div>

      <div className="comment-container">
        <CommentContainer
          setCommentList={setCommentList}
          commentList={commentList}
          isLoading={isLoading}
          setCommentCountChange={setCommentCountChange}
          setError={setError}
        />
      </div>
    </>
  );
};
export default SingleArticle;
