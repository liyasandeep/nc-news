import { useEffect, useState } from "react";
import * as API from "../api";
import TopicCard from "./TopicCard";
import ErrorPage from "./ErrorPage";

const ListAllTopics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topicList, setTopicList] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    API.getAllTopics()
      .then((topics) => {
        setTopicList(topics);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.response) {
          const {
            response: {
              data: { message },
              status,
            },
          } = err;

          setError({ message, status });
        } else {
          const message = err.message;
          setError({ message });
        }
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : error ? (
    <ErrorPage message={error.message} status={error.status} />
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
