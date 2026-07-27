import React from 'react';
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
