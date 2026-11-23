import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.contact')} | HUI YIN SEH</title>
      </Helmet>

      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.contact')}</h1>
          <p className="section-subtitle">{t('contact.metaDesc')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="max-w-wide">

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('contact.addressTitle')}</h2>
            <div className="content-paragraph">
              <p>📍 {t('contact.address')}</p>
              <p>📞 {t('contact.phone')}</p>
              <p>✉️ {t('contact.email')}</p>
              <p>🕒 {t('contact.hours')}</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
