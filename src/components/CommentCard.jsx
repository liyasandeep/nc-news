const CommentCard = ({ comment }) => {
  return (
    <li className="commentcard">
      <p className="postedBy">
        <strong>{comment.author}</strong> on{" "}
        {new Date(comment.created_at).toDateString()}
      </p>
      <p className="comment-body">{comment.body}</p>
      <span className="vote">
        {comment.votes} <strong>Votes</strong>
      </span>
    </li>
  );
};

export default CommentCard;
