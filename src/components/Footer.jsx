// src/components/Footer.jsx - Application Footer Component

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>{t('brandName')} {t('brandSub')}</h4>
            <p>{t('home.aboutText')}</p>
          </div>

          <div className="footer-col">
            <h4>{t('contact.addressTitle')}</h4>
            <p><MapPin size={16} /> {t('contact.address')}</p>
            <p><Phone size={16} /> {t('contact.phone')}</p>
            <p><Mail size={16} /> {t('contact.email')}</p>
            <p><Clock size={16} /> {t('contact.hours')}</p>
          </div>

          <div className="footer-col">
            <h4>快速連結 (Quick Links)</h4>
            <p><Link to="/about">{t('nav.about')}</Link></p>
            <p><Link to="/news">{t('nav.news')}</Link></p>
            <p><Link to="/donation">{t('nav.donation')}</Link></p>
            <p><Link to="/volunteer">{t('nav.volunteer')}</Link></p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {t('brandName')} Hui Yin Seh Penang. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
