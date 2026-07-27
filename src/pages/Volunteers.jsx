import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Volunteers = () => {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      <Helmet>
        <title>{t('nav.volunteers')} | HUI YIN SEH</title>
      </Helmet>
      <h1>{t('nav.volunteers')}</h1>
      <p>Placeholder for Volunteer Area page.</p>
    </div>
  );
};
