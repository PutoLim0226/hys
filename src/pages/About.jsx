import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      <Helmet>
        <title>{t('nav.about')} | HUI YIN SEH</title>
      </Helmet>
      <h1>{t('nav.about')}</h1>
      <p>Placeholder for About page.</p>
    </div>
  );
};
