// src/pages/NewsEvents.jsx - News & Events List Component

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
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
        setNews([
          {
            id: 1,
            title_zh: '慧音社熱血獻血活動 2026',
            title_en: 'Hui Yin Seh Blood Donation Drive 2026',
            content_zh: '慧音社誠邀廣大民眾踴躍參與2026年度愛心獻血活動，共同挽救生命，傳遞愛心。',
            content_en: 'Hui Yin Seh warmly invites the public to participate in our 2026 Blood Donation Drive.',
            category: 'donation_drive',
            cover_image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
            created_at: '2026-07-01'
          },
          {
            id: 2,
            title_zh: '慧音社合唱團週年紀念音樂會預告',
            title_en: 'Hui Yin Seh Choir Anniversary Concert Announcement',
            content_zh: '慧音社合唱團將於下月舉辦週年紀念音樂會，帶來多首溫馨動人的經典曲目。',
            content_en: 'Hui Yin Seh Choir will host an anniversary concert next month featuring inspirational classics.',
            category: 'choir',
            cover_image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
            created_at: '2026-06-25'
          }
        ]);
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

      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '3rem 0', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="section-title">{t('news.pageTitle')}</h1>
          <p className="section-subtitle">{t('news.metaDesc')}</p>
        </div>
      </section>

      <section className="container" style={{ padding: '3rem 1.25rem' }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
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
                <span className="card-category">{t(`news.${item.category}`) || item.category}</span>
                <h3 className="card-title">{lang === 'zh-CN' ? item.title_zh : item.title_en}</h3>
                <p className="card-excerpt">{lang === 'zh-CN' ? item.content_zh : item.content_en}</p>
                <div className="card-meta">
                  <span><Calendar size={14} /> {item.created_at ? item.created_at.substring(0, 10) : ''}</span>
                  <Link to={`/news/${item.id}`}>{t('news.readArticle')}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <p>{t('admin.noData')}</p>
          </div>
        )}
      </section>
    </div>
  );
};
