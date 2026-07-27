import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Charity = () => {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      <Helmet>
        <title>{t('nav.charity')} | HUI YIN SEH</title>
      </Helmet>
      <h1>{t('nav.charity')}</h1>
      <p>Placeholder for Charity Projects page.</p>
    </div>
  );
};
