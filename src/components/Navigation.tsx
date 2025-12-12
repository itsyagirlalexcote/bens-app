import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const basePath = import.meta.env.BASE_URL;

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace(basePath, '/');
    return currentPath === path || currentPath === `${path}/`;
  };

  if (!user) return null;

  const NavIcon = ({ icon }: { icon: string }) => (
    <span className="text-lg">{icon}</span>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="nav-header sticky top-0 z-50 hidden md:block">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-brand">
              <Link to="/dashboard" className="nav-logo">
                Nutrition Tracker
              </Link>
            </div>

            <div className="nav-links">
              <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              {user.role !== 'coach' && (
                <>
                  <Link
                    to="/track"
                    className={`nav-link ${isActive('/track') ? 'active' : ''}`}
                  >
                    Track Data
                  </Link>
                  <Link
                    to="/profile"
                    className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                  >
                    Profile
                  </Link>
                </>
              )}
              {user.role === 'coach' && (
                <Link
                  to="/coach"
                  className={`nav-link ${isActive('/coach') ? 'active' : ''}`}
                >
                  Coach View
                </Link>
              )}
            </div>

            <div className="nav-actions">
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
              <button onClick={logout} className="nav-logout hidden lg:inline-block">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="mobile-menu md:hidden">
        <div className="mobile-menu-items">
          <Link
            to="/dashboard"
            className={`mobile-menu-item ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <NavIcon icon="📊" />
            <span className="mt-1">Dashboard</span>
          </Link>
          {user.role !== 'coach' && (
            <>
              <Link
                to="/track"
                className={`mobile-menu-item ${isActive('/track') ? 'active' : ''}`}
              >
                <NavIcon icon="➕" />
                <span className="mt-1">Track</span>
              </Link>
              <Link
                to="/profile"
                className={`mobile-menu-item ${isActive('/profile') ? 'active' : ''}`}
              >
                <NavIcon icon="👤" />
                <span className="mt-1">Profile</span>
              </Link>
            </>
          )}
          {user.role === 'coach' && (
            <Link
              to="/coach"
              className={`mobile-menu-item ${isActive('/coach') ? 'active' : ''}`}
            >
              <NavIcon icon="👥" />
              <span className="mt-1">Coach</span>
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="mobile-menu-item"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
            <span className="mt-1">Theme</span>
          </button>
          <button
            onClick={logout}
            className="mobile-menu-item"
            aria-label="Logout"
          >
            <NavIcon icon="🚪" />
            <span className="mt-1">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

