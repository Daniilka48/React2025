import { Link } from '../navigation';
import '../../src/cssComponents/NotFound.css';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="not-found">
      <h1>{t('notfound_title')}</h1>
      <p>{t('notfound_text')}</p>
      <Link href="/">Return to Home</Link>
    </div>
  );
}
