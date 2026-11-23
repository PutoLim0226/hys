import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Charity = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.charity')} | HUI YIN SEH</title>
      </Helmet>

      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.charity')}</h1>
          <p className="section-subtitle">{t('nav.charity')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="max-w-wide">

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('nav.charity')}</h2>
            <div className="content-paragraph">
              {t('nav.charity')} — {t('ui.underConstruction')}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
