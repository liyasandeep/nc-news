import { useEffect, useState } from "react";
import * as API from "../api";
import TopicCard from "../components/TopicCard";
const ListAllTopics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topicList, setTopicList] = useState("");

  useEffect(() => {
    setIsLoading(true);

    API.getAllTopics().then((topics) => {
      setTopicList(topics);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <section className="topic-list">
      <h2>Topics</h2>
      <ul>
        {topicList.map((topic) => {
          return <TopicCard key={topic.slug} topic={topic} />;
        })}
      </ul>
    </section>
  );
};
export default ListAllTopics;
