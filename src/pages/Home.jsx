import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      <Helmet>
        <title>{t('nav.home')} | HUI YIN SEH</title>
      </Helmet>
      <h1>{t('nav.home')}</h1>
      <p>Placeholder for Home page.</p>
    </div>
  );
};
