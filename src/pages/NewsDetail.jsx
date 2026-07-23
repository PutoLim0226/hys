// src/pages/NewsDetail.jsx - News Detail View Component

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const NewsDetail = () => {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`/api/news_detail.php?id=${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && res.data) {
          setArticle(res.data);
        }
      })
      .catch(() => {
        setArticle(null);
      });
  }, [id]);

  if (!article) {
    return (
      <div className="container empty-state-box text-center">
        <p>Loading article...</p>
      </div>
    );
  }

  const title = lang === 'zh-CN' ? article.title_zh : article.title_en;
  const content = lang === 'zh-CN' ? article.content_zh : article.content_en;

  return (
    <div>
      <SeoHead title={title} description={content.substring(0, 150)} image={article.cover_image} />

      <section className="section-container">
        <div className="container article-container">
          <Link to="/news" className="btn btn-sm btn-secondary margin-bottom-md">
            <ArrowLeft size={16} /> {lang === 'zh-CN' ? '返回消息列表' : 'Back to News'}
          </Link>

          <span className="card-category category-badge-inline">
            <Tag size={14} /> {t(`news.${article.category}`) || article.category}
          </span>

          <h1 className="article-title">
            {title}
          </h1>

          <div className="article-meta">
            <Calendar size={16} /> {article.created_at ? article.created_at.substring(0, 10) : ''}
          </div>

          {article.cover_image && (
            <img
              src={article.cover_image}
              alt={title}
              className="article-cover-media"
            />
          )}

          <div className="article-content-body">
            {content}
          </div>
        </div>
      </section>
    </div>
  );
};
