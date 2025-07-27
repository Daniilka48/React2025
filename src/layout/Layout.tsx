import { Link, Outlet } from 'react-router-dom';
import '../cssComponents/Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout-header">
        <nav>
          <Link to="/">Search</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
