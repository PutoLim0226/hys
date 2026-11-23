import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Donation = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.donation')} | HUI YIN SEH</title>
      </Helmet>

      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.donation')}</h1>
          <p className="section-subtitle">{t('donation.methodsTitle')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="max-w-wide">

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('donation.bankTransfer')}</h2>
            <div className="content-paragraph">
              <p>
                <strong>{t('donation.bankName')}</strong><br />
                {t('donation.accName')}<br />
                {t('donation.accNo')}
              </p>
            </div>
          </div>

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('donation.onlineTitle')}</h2>
            <div className="content-paragraph">
              <p className="margin-bottom-sm">{t('donation.onlineDesc')}</p>
              <button className="btn btn-primary">{t('hero.donateBtn')}</button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
