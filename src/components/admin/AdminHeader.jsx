import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

import logoImg from '../../assets/img/logo.png';

export const AdminHeader = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-standalone-header">
      <div className="container flex-row-between">
        <div className="flex-row-gap-md">
          <img src={logoImg} alt="Logo" className="brand-logo-img-sm" />
          <div>
            <span className="admin-portal-brand">{t('brandName')}</span>
            <small className="admin-portal-sub">{t('nav.admin')}</small>
          </div>
        </div>

        <div className="flex-row-gap-sm">
          <button className="lang-btn" onClick={toggleLanguage} aria-label={t('ui.toggleLang')}>
            <Globe size={14} className="inline-icon" /> {lang === 'zh-CN' ? 'EN' : '中文'}
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label={t('ui.toggleTheme')}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={handleLogout} className="btn btn-secondary btn-sm">
            <LogOut size={16} /> {t('admin.logout')}
          </button>
        </div>
      </div>
    </header>
  );
};
