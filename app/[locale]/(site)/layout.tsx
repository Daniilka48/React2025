import { Link } from '../../navigation';
import { useTranslations } from 'next-intl';
import '@/cssComponents/Layout.css';
import ThemeSwitcher from '../../../src/components/ThemeSwitcher';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <div className="layout">
      <header className="layout-header">
        <nav className="nav-bar">
          <div className="nav-links">
            <Link href="/">{t('nav.search')}</Link>
            <Link href="/about">{t('nav.about')}</Link>
          </div>
          <ThemeSwitcher />
        </nav>
      </header>
      <main className="layout-main">{children}</main>
    </div>
  );
}
