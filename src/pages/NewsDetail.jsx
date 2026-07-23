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
      <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <p>Loading article...</p>
      </div>
    );
  }

  const title = lang === 'zh-CN' ? article.title_zh : article.title_en;
  const content = lang === 'zh-CN' ? article.content_zh : article.content_en;

  return (
    <div>
      <SeoHead title={title} description={content.substring(0, 150)} image={article.cover_image} />

      <section style={{ padding: '3rem 1.25rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Link to="/news" className="btn btn-sm btn-secondary" style={{ marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> 返回消息列表
          </Link>

          <span className="card-category" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Tag size={14} /> {t(`news.${article.category}`) || article.category}
          </span>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, margin: '0.5rem 0 1rem', lineHeight: 1.3 }}>
            {title}
          </h1>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} /> {article.created_at ? article.created_at.substring(0, 10) : ''}
          </div>

          {article.cover_image && (
            <img
              src={article.cover_image}
              alt={title}
              style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}
            />
          )}

          <div style={{ fontSize: '1.1rem', lineHeight: 1.8, whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
            {content}
          </div>
        </div>
      </section>
    </div>
  );
};
