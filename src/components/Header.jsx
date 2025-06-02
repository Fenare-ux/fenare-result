import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      // Əgər hazırda ana səhifədə deyilsə, ora yönləndir və sonra scroll et
      navigate('/');
      const waitForHome = setInterval(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          clearInterval(waitForHome);
        }
      }, 100);
    } else {
      // Əgər ana səhifədəsənsə, birbaşa scroll et
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        🍨 Crème Lane
      </div>
      <nav className="nav-links">
        <span onClick={handleHomeClick}>Home</span>
        <span onClick={() => scrollToSection('about-section')}>About</span>
        <span onClick={() => scrollToSection('menu-section')}>Menu</span>
        <span onClick={() => scrollToSection('reviews-section')}>Reviews</span>
        <span onClick={() => scrollToSection('contact-section')}>Contact</span>
        <span onClick={() => navigate('/cart')}>🛒</span>
        <span onClick={() => navigate('/login')}>🔐 Login</span>
      </nav>
    </header>
  );
};

export default Header;
