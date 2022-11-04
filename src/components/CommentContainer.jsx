import CommentCard from "./CommentCard";

const CommentContainer = ({
  setCommentCountChange,
  setCommentList,
  commentList,
  isLoading,
}) => {
  if (isLoading) return <p>Loading ...</p>;
  return (
    <ul>
      {commentList.map((comment, index) => {
        return (
          <CommentCard
            key={comment.created_at}
            comment={comment}
            setCommentList={setCommentList}
            setCommentCountChange={setCommentCountChange}
          />
        );
      })}
    </ul>
  );
};

export default CommentContainer;
