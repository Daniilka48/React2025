import { Link, Outlet } from 'react-router-dom';
import '../cssComponents/Layout.css';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout-header">
        <nav className="nav-bar">
          <div className="nav-links">
            <Link to="/">Search</Link>
            <Link to="/about">About</Link>
          </div>
          <ThemeSwitcher />
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
