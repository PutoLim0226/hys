import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Donation = () => {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      <Helmet>
        <title>{t('nav.donation')} | HUI YIN SEH</title>
      </Helmet>
      <h1>{t('nav.donation')}</h1>
      <p>Placeholder for Donation Support page.</p>
    </div>
  );
};
