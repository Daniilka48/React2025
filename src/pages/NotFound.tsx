import { Link } from 'react-router-dom';
import '../cssComponents/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <p>The page exist.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default NotFound;
