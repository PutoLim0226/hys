import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      <Helmet>
        <title>{t('nav.contact')} | HUI YIN SEH</title>
      </Helmet>
      <h1>{t('nav.contact')}</h1>
      <p>Placeholder for Contact Us page.</p>
    </div>
  );
};
