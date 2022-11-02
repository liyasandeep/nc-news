import { useState } from "react";
import * as API from "../api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const PostCommentForm = ({ article_id, setCommentList, setIsLoading }) => {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //make button disable here
    API.postCommentForArticle(article_id, user, newComment)
      .then((comment) => {
        console.log(comment);
        setCommentList((currentCommentList) => {
          return [comment, ...currentCommentList];
        });
        setNewComment("");
        //enable button here
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        name="comment"
        id="comment-textarea"
        cols="80"
        rows="3"
        placeholder="Write Your Comment Here..."
        value={newComment}
        onChange={handleChange}
      ></textarea>

      <button className="comment-btn">Comment</button>
    </form>
  );
};
export default PostCommentForm;
