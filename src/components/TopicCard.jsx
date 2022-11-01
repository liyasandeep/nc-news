import { Link } from "react-router-dom";
const TopicCard = ({ topic }) => {
  return (
    <li className="topiccard">
      <Link
        to={`/topics/${topic.slug}`}
        topic={topic.slug}
        className="link black"
      >
        <h3 className="topic-title">{topic.slug}</h3>
      </Link>
    </li>
  );
};
export default TopicCard;
