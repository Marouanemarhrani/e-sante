import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { AiOutlineUser } from 'react-icons/ai';
import './Header.css';

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Déconnexion réussie');
  };

  return (
    <>
      <nav className="navbar header-navbar">
        <div className="container-fluid header-container">
          {/* Logo Section */}
          <Link to="/" className="navbar-brand header-logo">
            MateSync
          </Link>

          {/* Navigation Links */}
          <div className="header-nav">
            <NavLink to="/" className="nav-link">
              Accueil
            </NavLink>
            <NavLink to="/about" className="nav-link">
              À propos
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </div>

          {/* Auth Links (Login / Register or Dashboard / Logout) */}
          <div className="header-auth">
            {!auth?.user ? (
              <>
                <NavLink to="/register" className="nav-link">
                  Inscription
                </NavLink>
                <NavLink to="/login" className="nav-link">
                  Connexion
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 'admin' ? 'admin' : auth?.user?.role === 'senior' ? 'senior' : 'tuteur'}`}
                  className="nav-link"
                >
                  Dashboard
                </NavLink>
                <NavLink onClick={handleLogout} to="/login" className="nav-link">
                  Déconnexion
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
