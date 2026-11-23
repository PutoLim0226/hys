import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.about')} | HUI YIN SEH</title>
      </Helmet>

      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.about')}</h1>
          <p className="section-subtitle">{t('about.pageTitle')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="max-w-wide">

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('about.historyTitle')}</h2>
            <div className="content-paragraph">
              {t('about.historyText')}
            </div>
          </div>

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('about.missionTitle')}</h2>
            <div className="content-paragraph">
              <ul className="content-list">
                <li>• {t('about.m1')}</li>
                <li>• {t('about.m2')}</li>
                <li>• {t('about.m3')}</li>
                <li>• {t('about.m4')}</li>
              </ul>
            </div>
          </div>

          <div className="card content-card">
            <h2 className="card-heading-primary">{t('about.orgTitle')}</h2>
            <div className="content-paragraph">
              {t('about.orgDesc')}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
