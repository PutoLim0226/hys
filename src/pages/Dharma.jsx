import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Dharma = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="page-container bg-light min-vh-100">
      <Helmet><title>{t('nav.dharma')} | HUI YIN SEH</title></Helmet>
      <div className="bg-primary text-white py-5 mb-5 text-center">
        <div className="container">
          <h1 className="display-4 font-weight-bold">{t('nav.dharma')}</h1>
          <p className="lead">{lang === 'zh-CN' ? '淨化人心，祥和社會' : 'Purify human hearts, harmonize society'}</p>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0 p-5">
              <h3 className="h4 text-primary mb-3">{lang === 'zh-CN' ? '佛法講座' : 'Dharma Talks'}</h3>
              <p className="text-muted lead">{lang === 'zh-CN' ? '邀請高僧大德弘法，開示人生智慧。' : 'Inviting venerables to give Dharma talks and share wisdom.'}</p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0 p-5">
              <h3 className="h4 text-primary mb-3">{lang === 'zh-CN' ? '禪修活動' : 'Meditation Retreats'}</h3>
              <p className="text-muted lead">{lang === 'zh-CN' ? '定期舉辦禪修營，找回內心的平靜與自在。' : 'Regular meditation retreats to help you find inner peace.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
