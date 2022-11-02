import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import * as API from "../api";

const CommentContainer = ({ article_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [commentList, setCommentList] = useState("");

  useEffect(() => {
    API.getCommentsByArticleId(article_id).then((comments) => {
      setCommentList(comments);
      setIsLoading(false);
    });
  }, []);
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
