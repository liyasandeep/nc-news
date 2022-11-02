const PostCommentForm = () => {
  return (
    <form className="comment-form">
      {/* <label htmlFor="comment-textarea" id="comment-label"> */}
      <textarea
        name="comment"
        id="comment-textarea"
        cols="80"
        rows="10"
        placeholder="Write Your Comment Here..."
      ></textarea>

      <button className="comment-btn">Comment</button>
    </form>
  );
};
export default PostCommentForm;
