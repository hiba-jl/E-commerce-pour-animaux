import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import NotificationBell from './NotificationBell';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">E-Commerce</Link>
        
        <div className="navbar-links">
          <Link to="/products">Produits</Link>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin">Admin</Link>
                  <NotificationBell />
                </>
              )}
              <Link to="/cart">Panier ({cartCount})</Link>
              <Link to="/orders">Mes Commandes</Link>
              <Link to="/profile">Profil</Link>
              <button onClick={handleLogout} className="btn btn-secondary">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login">Connexion</Link>
              <Link to="/register">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


