import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Dharma = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.dharma')} | HUI YIN SEH</title>
      </Helmet>

      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.dharma')}</h1>
          <p className="section-subtitle">{t('nav.dharma')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="max-w-wide">

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('nav.dharma')}</h2>
            <div className="content-paragraph">
              {t('nav.dharma')} — {t('ui.underConstruction')}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
