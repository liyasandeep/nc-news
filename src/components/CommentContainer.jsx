import CommentCard from "./CommentCard";

const CommentContainer = ({ commentList, isLoading }) => {
  console.log(commentList);
  if (isLoading) return <p>Loading ...</p>;
  return (
    <ul>
      {commentList.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentContainer;
