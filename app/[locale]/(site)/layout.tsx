import { useTranslations } from 'next-intl';
import { Link } from '../../navigation';
import ThemeSwitcher from '../../../src/components/ThemeSwitcher';
import '../../../src/cssComponents/Layout.css';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations();

  return (
    <div className="layout">
      <header className="layout-header">
        <nav className="nav-bar">
          <div className="nav-links">
            <Link href="/">{t('nav_search')}</Link>
            <Link href="/about">{t('nav_about')}</Link>
          </div>
          <ThemeSwitcher />
        </nav>
      </header>
      <main className="layout-main">{children}</main>
    </div>
  );
}
