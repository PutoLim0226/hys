import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';

export const NewsDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  return (
    <div>
      <Helmet><title>{t('news.readArticle')} | HUI YIN SEH</title></Helmet>

      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('news.sample1Title')}</h1>
          <p className="section-subtitle"><Calendar size={16} className="inline-icon" /> 2026-07-20</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="article-container">
          <div className="card content-card">
            <div className="content-paragraph">
              <p>{t('news.articleUnderConstruction')}</p>
            </div>
            <div className="margin-top-md">
              <Link to="/news" className="btn btn-outline-primary">
                <ArrowLeft size={16} /> {t('nav.news')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
