import { RiDeleteBinLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import * as API from "../api";
import toast, { Toaster } from "react-hot-toast";
const CommentCard = ({ comment, setCommentList, setCommentCountChange }) => {
  const { user } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {});
  const handleClick = (commentId) => {
    setIsDeleting(true);

    setCommentCountChange((currentCount) => {
      return currentCount - 1;
    });

    API.deleteCommentById(commentId)
      .then(() => {
        setCommentList((currentCommentList) => {
          let newCommentList = [...currentCommentList];

          newCommentList = newCommentList.filter((comment) => {
            return comment.comment_id !== commentId;
          });
          return newCommentList;
        });
        toast.success("Successfully deleted the comment!");
        setIsDeleting(false);
      })
      .catch((err) => {
        setCommentCountChange((currentCount) => {
          return currentCount + 1;
        });
        toast.error("OOPS!!!,Something went wrong, please try again later");
        setIsDeleting(false);
      });
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <li className="commentcard">
        <p className="postedBy">
          <strong>{comment.author}</strong> on{" "}
          {new Date(comment.created_at).toDateString()}
        </p>

        <p className="comment-body">{comment.body}</p>
        <p className="btn-container">
          <span className="vote">
            {comment.votes} <strong>Votes</strong>
          </span>
          {comment.author === user ? (
            <button
              id="delete-btn"
              disabled={isDeleting}
              onClick={() => {
                handleClick(comment.comment_id);
              }}
            >
              <RiDeleteBinLine />
            </button>
          ) : (
            ""
          )}
        </p>
      </li>
    </>
  );
};

export default CommentCard;
