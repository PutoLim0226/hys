// src/components/Header.jsx - Main Application Navigation Header

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

import logoImg from '../assets/img/logo.png';

export const Header = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="app-header">
      <div className="container header-container">
        <Link to="/" className="brand-logo" onClick={closeMobile}>
          <img src={logoImg} alt="慧音社 Logo" className="brand-logo-img" />
          <div>
            <span>{t('brandName')}</span>
            <small className="brand-sub">{t('brandSub')}</small>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-menu">
            <li className="nav-item"><NavLink to="/" end>{t('nav.home')}</NavLink></li>
            <li className="nav-item"><NavLink to="/about">{t('nav.about')}</NavLink></li>
            <li className="nav-item"><NavLink to="/news">{t('nav.news')}</NavLink></li>
            <li className="nav-item"><NavLink to="/donation">{t('nav.donation')}</NavLink></li>
            <li className="nav-item"><NavLink to="/volunteer">{t('nav.volunteer')}</NavLink></li>
            <li className="nav-item"><NavLink to="/contact">{t('nav.contact')}</NavLink></li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button className="lang-btn" onClick={toggleLanguage} aria-label="Toggle language">
            <Globe size={14} className="inline-icon" /> {lang === 'zh-CN' ? 'EN' : '中文'}
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button className="mobile-toggle" onClick={toggleMobile} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li><NavLink to="/" end onClick={closeMobile}>{t('nav.home')}</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobile}>{t('nav.about')}</NavLink></li>
          <li><NavLink to="/news" onClick={closeMobile}>{t('nav.news')}</NavLink></li>
          <li><NavLink to="/donation" onClick={closeMobile}>{t('nav.donation')}</NavLink></li>
          <li><NavLink to="/volunteer" onClick={closeMobile}>{t('nav.volunteer')}</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMobile}>{t('nav.contact')}</NavLink></li>
        </ul>
      </div>
    </header>
  );
};
