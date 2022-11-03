import { useState } from "react";
import * as API from "../api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import toast, { Toaster } from "react-hot-toast";

const PostCommentForm = ({
  article_id,
  setCommentList,
  setCommentCountChange,
}) => {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = {
      author: user,
      body: newComment,
      created_at: Date.now(),
      votes: 0,
    };

    setIsPostingComment(true);
    setCommentList((currentCommentList) => {
      return [comment, ...currentCommentList];
    });

    setNewComment("");
    setCommentCountChange((currentCount) => {
      return currentCount + 1;
    });

    API.postCommentForArticle(article_id, comment)
      .then((commentFromDb) => {
        toast.success("Successfully posted the comment!");
        setIsPostingComment(false);
      })
      .catch((err) => {
        toast.error("OOPS!!!,Something went wrong, please try again later");
        setCommentList((currentCommentList) => {
          const newCommentList = [...currentCommentList];
          newCommentList.shift();
          return newCommentList;
        });
        setCommentCountChange((currentCount) => {
          return currentCount - 1;
        });

        setIsPostingComment(false);
      });
  };
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          name="comment"
          id="comment-textarea"
          cols="80"
          rows="3"
          placeholder="Write Your Comment Here..."
          value={newComment}
          onChange={handleChange}
          required
          disabled={isPostingComment}
        ></textarea>

        <button className="comment-btn" disabled={isPostingComment}>
          Comment
        </button>
      </form>
    </>
  );
};
export default PostCommentForm;
