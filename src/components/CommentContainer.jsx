import CommentCard from "./CommentCard";

const CommentContainer = ({ commentList, isLoading }) => {
  if (isLoading) return <p>Loading ...</p>;
  return (
    <ul>
      {commentList.map((comment) => {
        return <CommentCard key={comment.created_at} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentContainer;
