import os

code = """import React from 'react';
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
                <span className="card-category" style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 600 }}>{t(`news.${item.category}`) || item.category}</span>
                <h3 className="card-title" style={{ margin: '0.5rem 0' }}>{item.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
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
"""
with open('src/pages/News.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

code_detail = """import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';

export const NewsDetail = () => {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  
  return (
    <div>
      <Helmet><title>{t('news.readArticle')} | HUI YIN SEH</title></Helmet>
      
      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{lang === 'zh-CN' ? '2026年大型捐血活动圆满结束' : '2026 Mega Blood Donation Drive Concluded'}</h1>
          <p className="section-subtitle"><Calendar size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> 2026-07-20</p>
        </div>
      </section>
      
      <section className="container section-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '2.5rem' }}>
            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <p>{lang === 'zh-CN' ? '文章内容建设中...' : 'Article content under construction...'}</p>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/news" className="btn btn-outline-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowLeft size={16} /> {t('nav.news')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
"""
with open('src/pages/NewsDetail.jsx', 'w', encoding='utf-8') as f:
    f.write(code_detail)

print("News pages rewritten!")
