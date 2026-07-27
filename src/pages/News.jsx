import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export const News = () => {
  const { t, lang } = useLanguage();
  
  const dummyNews = [
    { id: 1, title: lang === 'zh-CN' ? '2026年大型捐血活动圆满结束' : '2026 Mega Blood Donation Drive Concluded', date: '2026-07-20', category: 'donation_drive' },
    { id: 2, title: lang === 'zh-CN' ? '慧音社合唱团年度公演开放售票' : 'Annual Choir Concert Tickets Available', date: '2026-07-15', category: 'choir' },
    { id: 3, title: lang === 'zh-CN' ? '清寒学子助学金颁发典礼' : 'Scholarship Award Ceremony', date: '2026-07-10', category: 'charity' },
  ];

  return (
    <div className="page-container bg-light min-vh-100">
      <Helmet><title>{t('nav.news')} | HUI YIN SEH</title></Helmet>
      <div className="bg-primary text-white py-5 mb-5 text-center">
        <div className="container">
          <h1 className="display-4 font-weight-bold">{t('nav.news')}</h1>
          <p className="lead">{t('news.metaDesc')}</p>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row">
          {dummyNews.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="mb-2 text-primary small font-weight-bold">{t(`news.${item.category}`)}</div>
                  <h3 className="h5 mb-3 font-weight-bold">{item.title}</h3>
                  <div className="text-muted small mb-4 d-flex align-items-center">
                    <Calendar size={14} className="me-2" /> {item.date}
                  </div>
                  <Link to={`/news/${item.id}`} className="btn btn-outline-primary mt-auto align-self-start px-4">{t('news.readArticle')}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
