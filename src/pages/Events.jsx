import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Events = () => {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      <Helmet>
        <title>{t('nav.events')} | HUI YIN SEH</title>
      </Helmet>
      <h1>{t('nav.events')}</h1>
      <p>Placeholder for Events page.</p>
    </div>
  );
};
