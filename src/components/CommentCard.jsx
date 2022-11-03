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
    console.log(commentId, "up");
    setCommentList((currentCommentList) => {
      let newCommentList = [...currentCommentList];
      newCommentList = newCommentList.filter((comment) => {
        return comment.comment_id !== commentId;
      });
      return newCommentList;
    });
    setCommentCountChange((currentCount) => {
      return currentCount - 1;
    });
    console.log(commentId, "id");
    API.deleteCommentById(commentId)
      .then(() => {
        toast.success("Successfully deleted the comment!");
      })
      .catch((err) => {
        toast.error("OOPS!!!,Something went wrong, please try again later");
        // setCommentList((currentCommentList) => {
        //   const newCommentList = [...currentCommentList];
        //   newCommentList.shift();
        //   return newCommentList;
        // });
        setCommentCountChange((currentCount) => {
          return currentCount + 1;
        });
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
          <button
            id="delete-btn"
            disabled={comment.author !== user}
            onClick={() => {
              handleClick(comment.comment_id);
            }}
          >
            <RiDeleteBinLine />
          </button>
        </p>
      </li>
    </>
  );
};

export default CommentCard;
