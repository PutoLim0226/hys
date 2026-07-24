// src/pages/NewsEvents.jsx - News & Events List Component with Event Date & Upcoming Badges

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const NewsEvents = () => {
  const { lang, t } = useLanguage();
  const [news, setNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch('/api/news.php?status=published')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          setNews(res.data);
        }
      })
      .catch(() => {
        setNews([]);
      });
  }, []);

  const categories = [
    { key: 'all', label: t('news.all') },
    { key: 'donation_drive', label: t('news.donation_drive') },
    { key: 'choir', label: t('news.choir') },
    { key: 'charity', label: t('news.charity') },
    { key: 'general', label: t('news.general') }
  ];

  const filteredNews = activeCategory === 'all'
    ? news
    : news.filter(item => item.category === activeCategory);

  return (
    <div>
      <SeoHead title={t('nav.news')} description={t('news.metaDesc')} />

      <section className="page-header-banner">
        <div className="container text-center">
          <h1 className="section-title">{t('news.pageTitle')}</h1>
          <p className="section-subtitle">{t('news.metaDesc')}</p>
        </div>
      </section>

      <section className="container section-container">
        {/* Category Filters */}
        <div className="category-filter-bar">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`btn btn-sm ${activeCategory === cat.key ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Tag size={14} /> {cat.label}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid-layout">
          {filteredNews.map(item => (
            <div className="card" key={item.id}>
              <img
                src={item.cover_image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=800&q=80'}
                alt={lang === 'zh-CN' ? item.title_zh : item.title_en}
                className="card-media"
              />
              <div className="card-body">
                <div className="flex-row-between margin-bottom-xs">
                  <span className="card-category">{t(`news.${item.category}`) || item.category}</span>
                  {item.event_date && (
                    <span className="badge badge-confirmed text-xs">
                      <Clock size={12} /> {lang === 'zh-CN' ? '活动预告' : 'Upcoming Event'}
                    </span>
                  )}
                </div>

                <h3 className="card-title">{lang === 'zh-CN' ? item.title_zh : item.title_en}</h3>
                <p className="card-excerpt">{lang === 'zh-CN' ? item.content_zh : item.content_en}</p>

                {item.event_date && (
                  <div className="text-xs font-bold text-primary margin-bottom-xs flex-row-gap-xs">
                    <Calendar size={14} /> {lang === 'zh-CN' ? '活动日期：' : 'Event Date: '} {item.event_date}
                  </div>
                )}

                <div className="card-meta">
                  <span><Calendar size={14} /> {item.created_at ? item.created_at.substring(0, 10) : ''}</span>
                  <Link to={`/news/${item.id}`}>{t('news.readArticle')}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="empty-state-box">
            <p>{t('admin.noData')}</p>
          </div>
        )}
      </section>
    </div>
  );
};
