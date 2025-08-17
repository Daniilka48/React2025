import Image from 'next/image';
import { Link } from '../../../navigation';
import '../../../../src/cssComponents/About.css';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations();

  return (
    <div className="about-page">
      <Image
        src="/images/daniil2.jpg"
        alt="Daniil Terekhin"
        className="about-photo"
        width={240}
        height={240}
        priority
      />
      <h1>Daniil Terekhin</h1>
      <h2>Frontend Developer</h2>

      <p className="about-bio">{t('about_bio')}</p>

      <p>
        RS School React Course:{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          https://rs.school/react/
        </a>
      </p>

      <p>
        GitHub:{' '}
        <a
          href="https://github.com/daniilka48"
          target="_blank"
          rel="noreferrer"
        >
          github.com/daniilka48
        </a>
      </p>

      <Link href="/" className="about-link-back">
        {t('about_back')}
      </Link>
    </div>
  );
}
