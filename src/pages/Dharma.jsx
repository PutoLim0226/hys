import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Dharma = () => {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      <Helmet>
        <title>{t('nav.dharma')} | HUI YIN SEH</title>
      </Helmet>
      <h1>{t('nav.dharma')}</h1>
      <p>Placeholder for Dharma Propagation page.</p>
    </div>
  );
};
