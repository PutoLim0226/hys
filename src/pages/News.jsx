import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const News = () => {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      <Helmet>
        <title>{t('nav.news')} | HUI YIN SEH</title>
      </Helmet>
      <h1>{t('nav.news')}</h1>
      <p>Placeholder for News Center page.</p>
    </div>
  );
};
