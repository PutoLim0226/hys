import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export const Events = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="page-container bg-light min-vh-100">
      <Helmet>
        <title>{t('nav.events')} | HUI YIN SEH</title>
      </Helmet>

      <div className="bg-primary text-white py-5 mb-5 text-center">
        <div className="container">
          <h1 className="display-4 font-weight-bold">{t('nav.events')}</h1>
          <p className="lead">{lang === 'zh-CN' ? '最新活動資訊與回顧' : 'Latest Events and Reviews'}</p>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0 p-5">
              <h3 className="h4 text-primary font-weight-bold mb-3">{lang === 'zh-CN' ? '近期活動' : 'Upcoming Events'}</h3>
              <p className="text-muted lead mb-4">{lang === 'zh-CN' ? '查看我們即將舉辦的各項活動，歡迎踴躍報名參加。' : 'Check out our latest upcoming events and register to join us.'}</p>
              <Link to="/news" className="btn btn-outline-primary mt-auto align-self-start px-4 py-2">{lang === 'zh-CN' ? '查看更多' : 'View More'}</Link>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0 p-5">
              <h3 className="h4 text-primary font-weight-bold mb-3">{lang === 'zh-CN' ? '活動回顧' : 'Past Events'}</h3>
              <p className="text-muted lead mb-4">{lang === 'zh-CN' ? '回顧我們過去舉辦的精彩活動與珍貴時刻。' : 'Review our wonderful past events and precious moments.'}</p>
              <Link to="/news" className="btn btn-outline-primary mt-auto align-self-start px-4 py-2">{lang === 'zh-CN' ? '查看回顧' : 'View Past Events'}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
