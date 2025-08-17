import { Link } from '../navigation';
import '@/cssComponents/NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <p>The page you&#39;re looking for doesn&#39;t exist.</p>
      <Link href="/">Return to Home</Link>
    </div>
  );
}
