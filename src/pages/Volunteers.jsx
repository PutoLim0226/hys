import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Volunteers = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.volunteers')} | HUI YIN SEH</title>
      </Helmet>

      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.volunteers')}</h1>
          <p className="section-subtitle">{t('volunteer.joinTitle')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="max-w-wide">

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('volunteer.reqTitle')}</h2>
            <div className="content-paragraph">
              <ul className="content-list">
                <li>• {t('volunteer.req1')}</li>
                <li>• {t('volunteer.req2')}</li>
                <li>• {t('volunteer.req3')}</li>
              </ul>
            </div>
          </div>

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('volunteer.formTitle')}</h2>
            <div className="content-paragraph">
              <p className="margin-bottom-sm">{t('volunteer.formDesc')}</p>
              <button className="btn btn-primary">{t('volunteer.submitBtn')}</button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
