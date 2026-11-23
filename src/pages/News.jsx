import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export const News = () => {
  const { t } = useLanguage();

  const dummyNews = [
    { id: 1, title: t('news.sample1Title'), date: '2026-07-20', category: 'donation_drive' },
    { id: 2, title: t('news.sample2Title'), date: '2026-07-15', category: 'choir' },
    { id: 3, title: t('news.sample3Title'), date: '2026-07-10', category: 'charity' },
  ];

  return (
    <div>
      <Helmet><title>{t('nav.news')} | HUI YIN SEH</title></Helmet>

      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.news')}</h1>
          <p className="section-subtitle">{t('news.metaDesc')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid-layout">
          {dummyNews.map(item => (
            <div key={item.id} className="card">
              <div className="card-body">
                <span className="card-category news-card-category">{t(`news.${item.category}`) || item.category}</span>
                <h3 className="card-title news-card-title">{item.title}</h3>
                <div className="news-card-date">
                  <Calendar size={14} /> {item.date}
                </div>
                <Link to={`/news/${item.id}`} className="btn btn-secondary">
                  {t('news.readArticle')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
