import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { AiOutlineUser } from 'react-icons/ai';
import './Header.css'; // Les styles CSS spécifiques au Header

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
      <nav className="header1 navbar navbar-expand-lg">
        <div className="header2 container-fluid">
          {/* Logo visible à tout moment */}
          <Link to="/" className="header6 navbar-brand">
            Mate
          </Link>

          {/* Bouton de toggler pour le menu mobile */}
          <button 
            className="header3 navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarTogglerDemo01" 
            aria-controls="navbarTogglerDemo01" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="header4 navbar-toggler-icon" />
          </button>

          {/* Collapsible part of the navbar */}
          <div className="header5 collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="header7 navbar-nav mb-2 mb-lg-0">
              <li className="header8 nav-item">
                <Link className="header9 nav-link" to="/">
                  Accueil
                </Link>
              </li>
              <li className="header13 nav-item">
                <Link className="header14 nav-link" to="/about">
                  À propos
                </Link>
              </li>
              <li className="header13 nav-item">
                <Link className="header14 nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <ul className="header19 navbar-nav ms-auto mb-2 mb-lg-0">
              {!auth?.user ? (  // Vérification si l'utilisateur est authentifié
                <>
                  <li className="header20 nav-item">
                    <NavLink to="/register" className="header21 nav-link">
                      Inscription
                    </NavLink>
                  </li>
                  <li className="header22 nav-item">
                    <NavLink to="/login" className="header23 nav-link">
                      Connexion
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="header24 nav-item dropdown">
                    <NavLink 
                      className="header25 nav-link dropdown" 
                      href="#" 
                      role="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      <AiOutlineUser />
                    </NavLink>
                    <ul className="header26 dropdown-menu">
                      <li>
                        <NavLink 
                          to={`/dashboard/${
                            auth?.user?.role === 'admin' ? 'admin' 
                              : auth?.user?.role === 'senior' ? 'senior' 
                              : 'tuteur'
                          }`}
                          className="header27 dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login" 
                          className="header28 dropdown-item"
                        >
                          Déconnexion
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
