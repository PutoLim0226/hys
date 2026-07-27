// src/pages/Home.jsx - Homepage Component

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const Home = () => {
  const { lang, t } = useLanguage();
  const [featuredNews, setFeaturedNews] = useState([]);

  useEffect(() => {
    fetch('/api/news.php?status=published')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          setFeaturedNews(res.data.slice(0, 3));
        }
      })
      .catch(() => {
        setFeaturedNews([]);
      });
  }, []);

  return (
    <div>
      <SeoHead title={t('nav.home')} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <div className="hero-actions">
            <Link to="/donation" className="btn btn-primary">
              <Heart size={18} /> {t('hero.donateBtn')}
            </Link>
            <Link to="/volunteer" className="btn btn-outline-white">
              <Users size={18} /> {t('hero.volunteerBtn')}
            </Link>
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <section className="container section-padding">
        <h2 className="section-title">{t('home.aboutSectionTitle')}</h2>
        <p className="section-subtitle">{t('home.aboutSectionSub')}</p>
        
        <div className="grid-layout">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">弘揚佛法與教化</h3>
              <p className="card-excerpt">推動佛學講座、發行社刊、辦理慈幼班，引導青少年立身正道。</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">定期愛心獻血</h3>
              <p className="card-excerpt">常年組織大型愛心捐血運動，協助檳城中央醫院庫存充裕，累計救人無數。</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">音樂藝術與合唱團</h3>
              <p className="card-excerpt">慧音社合唱團致力於推廣高品質合唱藝術，透過美妙歌聲傳遞平和與愛。</p>
            </div>
          </div>
        </div>

        <div className="text-center margin-top-md">
          <Link to="/about" className="btn btn-secondary">
            {t('home.readMore')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Latest News Highlights */}
      <section className="section-padding page-banner">
        <div className="container">
          <h2 className="section-title">{t('home.newsSectionTitle')}</h2>
          <p className="section-subtitle">{t('home.newsSectionSub')}</p>

          <div className="grid-layout">
            {featuredNews.map(item => (
              <div className="card" key={item.id}>
                <img src={item.cover_image} alt={lang === 'zh-CN' ? item.title_zh : item.title_en} className="card-media" />
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

          <div className="text-center margin-top-md">
            <Link to="/news" className="btn btn-primary">
              {t('home.viewAllNews')}
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">{t('home.impactTitle')}</h2>
          <div className="grid-layout margin-top-md">
            <div className="card stat-card">
              <Heart size={48} className="stat-icon" />
              <h3 className="stat-number">{t('home.bloodCount')}</h3>
              <p>{t('home.bloodLabel')}</p>
            </div>
            <div className="card stat-card">
              <Users size={48} className="stat-icon" />
              <h3 className="stat-number">{t('home.memberCount')}</h3>
              <p>{t('home.memberLabel')}</p>
            </div>
            <div className="card stat-card">
              <Award size={48} className="stat-icon" />
              <h3 className="stat-number">{t('home.yearsCount')}</h3>
              <p>{t('home.yearsLabel')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Callout Banner */}
      <section className="callout-banner">
        <div className="container callout-content">
          <h2>{t('home.donationCalloutTitle')}</h2>
          <p>{t('home.donationCalloutText')}</p>
          <Link to="/donation" className="btn btn-primary">
            <Heart size={20} /> {t('hero.donateBtn')}
          </Link>
        </div>
      </section>
    </div>
  );
};
