import Image from 'next/image';
import { Link } from '../../../navigation';
import '@/cssComponents/About.css';

export default function About() {
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

      <p className="about-bio">
        Graduate of Lipetsk State Technical University, majoring in Economics
        and Management at Enterprises. Before becoming a programmer, he worked
        in sales, service and SMM, developing communication and promotion
        skills. Currently studying on the React course at RS School, where he
        has already implemented several projects and significantly improved his
        programming skills.
      </p>

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
        Back to Search
      </Link>
    </div>
  );
}
