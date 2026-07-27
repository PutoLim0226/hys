import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Charity = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="page-container bg-light min-vh-100">
      <Helmet><title>{t('nav.charity')} | HUI YIN SEH</title></Helmet>
      <div className="bg-primary text-white py-5 mb-5 text-center">
        <div className="container">
          <h1 className="display-4 font-weight-bold">{t('nav.charity')}</h1>
          <p className="lead">{lang === 'zh-CN' ? '用愛心點亮希望，用行動溫暖人間' : 'Light up hope with love, warm the world with actions'}</p>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 p-4 text-center">
              <h3 className="h5 text-primary mb-3">{lang === 'zh-CN' ? '教育計劃' : 'Education Program'}</h3>
              <p className="text-muted">{lang === 'zh-CN' ? '提供清寒學子助學金，培育未來人才。' : 'Providing scholarships for underprivileged students.'}</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 p-4 text-center">
              <h3 className="h5 text-primary mb-3">{lang === 'zh-CN' ? '扶貧助困' : 'Poverty Relief'}</h3>
              <p className="text-muted">{lang === 'zh-CN' ? '救濟弱勢家庭，提供物資與急難救助。' : 'Providing relief supplies and emergency aid.'}</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 p-4 text-center">
              <h3 className="h5 text-primary mb-3">{lang === 'zh-CN' ? '醫療援助' : 'Medical Aid'}</h3>
              <p className="text-muted">{lang === 'zh-CN' ? '定期舉辦捐血活動，補助清寒病患。' : 'Organizing blood donation and helping poor patients.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
