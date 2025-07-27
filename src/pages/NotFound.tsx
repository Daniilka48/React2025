import { Link } from 'react-router-dom';
import '../cssComponents/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <p>The page you&#39;re looking for doesn&#39;t exist.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default NotFound;
