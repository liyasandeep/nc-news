import { Link } from "react-router-dom";
const ErrorPage = ({ message, status }) => {
  status = status || 404;
  return (
    <>
      <h3 id="error">
        {status} : {message || "Not Found"}
      </h3>
      <Link to="/" className="error-link">
        Go back Home
      </Link>
    </>
  );
};
export default ErrorPage;
