// src/components/Header.jsx - Main Application Navigation Header with Search & Verification

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Globe, Menu, X, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SiteSearchModal } from './SiteSearchModal';

import logoImg from '../assets/img/logo.png';

export const Header = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="app-header">
      <div className="container header-container">
        <Link to="/" className="brand-logo" onClick={closeMobile}>
          <img src={logoImg} alt={t('ui.logoAlt')} className="brand-logo-img" />
          <div className="brand-text">
            <span className="brand-name">{t('brandName')}</span>
            <small className="brand-sub">{t('brandSub')}</small>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-menu">
            <li className="nav-item"><NavLink to="/" end>{t('nav.home')}</NavLink></li>
            <li className="nav-item"><NavLink to="/about">{t('nav.about')}</NavLink></li>
            <li className="nav-item"><NavLink to="/events">{t('nav.events')}</NavLink></li>
            <li className="nav-item"><NavLink to="/charity">{t('nav.charity')}</NavLink></li>
            <li className="nav-item"><NavLink to="/dharma">{t('nav.dharma')}</NavLink></li>
            <li className="nav-item"><NavLink to="/volunteers">{t('nav.volunteers')}</NavLink></li>
            <li className="nav-item"><NavLink to="/donation">{t('nav.donation')}</NavLink></li>
            <li className="nav-item"><NavLink to="/news">{t('nav.news')}</NavLink></li>
            <li className="nav-item"><NavLink to="/contact">{t('nav.contact')}</NavLink></li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label={t('ui.search')} title={t('ui.search')}>
            <Search size={18} />
          </button>

          <button className="lang-btn" onClick={toggleLanguage} aria-label={t('ui.toggleLang')}>
            <Globe size={14} className="inline-icon" /> {lang === 'zh-CN' ? 'EN' : '中文'}
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label={t('ui.toggleTheme')}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button className="mobile-toggle" onClick={toggleMobile} aria-label={t('ui.toggleMenu')}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li><NavLink to="/" end onClick={closeMobile}>{t('nav.home')}</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobile}>{t('nav.about')}</NavLink></li>
          <li><NavLink to="/events" onClick={closeMobile}>{t('nav.events')}</NavLink></li>
          <li><NavLink to="/charity" onClick={closeMobile}>{t('nav.charity')}</NavLink></li>
          <li><NavLink to="/dharma" onClick={closeMobile}>{t('nav.dharma')}</NavLink></li>
          <li><NavLink to="/volunteers" onClick={closeMobile}>{t('nav.volunteers')}</NavLink></li>
          <li><NavLink to="/donation" onClick={closeMobile}>{t('nav.donation')}</NavLink></li>
          <li><NavLink to="/news" onClick={closeMobile}>{t('nav.news')}</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMobile}>{t('nav.contact')}</NavLink></li>
        </ul>
      </div>

      {/* Site-wide Search Modal */}
      <SiteSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};
