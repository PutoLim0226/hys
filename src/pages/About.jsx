import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="page-container bg-light min-vh-100">
      <Helmet>
        <title>{t('nav.about')} | HUI YIN SEH</title>
        <meta name="description" content={t('about.metaDesc')} />
      </Helmet>
      
      {/* Page Header */}
      <div className="bg-primary text-white py-5 mb-5 text-center">
        <div className="container">
          <h1 className="display-4 font-weight-bold">{t('nav.about')}</h1>
          <p className="lead">{t('about.pageTitle')}</p>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-5">
                <h2 className="h3 text-primary font-weight-bold mb-4">{t('about.historyTitle')}</h2>
                <p className="lead text-muted" style={{ lineHeight: '1.8' }}>{t('about.historyText')}</p>
              </div>
            </div>

            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-5">
                <h2 className="h3 text-primary font-weight-bold mb-4">{t('about.missionTitle')}</h2>
                <ul className="list-group list-group-flush lead text-muted">
                  <li className="list-group-item border-0 px-0 py-3"><i className="text-primary me-2">•</i> {t('about.m1')}</li>
                  <li className="list-group-item border-0 px-0 py-3"><i className="text-primary me-2">•</i> {t('about.m2')}</li>
                  <li className="list-group-item border-0 px-0 py-3"><i className="text-primary me-2">•</i> {t('about.m3')}</li>
                  <li className="list-group-item border-0 px-0 py-3"><i className="text-primary me-2">•</i> {t('about.m4')}</li>
                </ul>
              </div>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                <h2 className="h3 text-primary font-weight-bold mb-4">{t('about.orgTitle')}</h2>
                <p className="lead text-muted" style={{ lineHeight: '1.8' }}>{t('about.orgDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
