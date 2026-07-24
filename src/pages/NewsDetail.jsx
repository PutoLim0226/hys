// src/pages/NewsDetail.jsx - News & Event Detail Component with PRD v2.0 Components

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';
import { CapacityProgressBar } from '../components/CapacityProgressBar';
import { FundraisingProgressBar } from '../components/FundraisingProgressBar';
import { AddToCalendar } from '../components/AddToCalendar';
import { SocialShareButtons } from '../components/SocialShareButtons';

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
          <div className="flex-row-between margin-bottom-md flex-wrap-gap">
            <Link to="/news" className="btn btn-sm btn-secondary">
              <ArrowLeft size={16} /> {lang === 'zh-CN' ? '返回消息列表' : 'Back to News'}
            </Link>

            <AddToCalendar title={title} description={content.substring(0, 200)} />
          </div>

          <span className="card-category category-badge-inline">
            <Tag size={14} /> {t(`news.${article.category}`) || article.category}
          </span>

          <h1 className="article-title margin-top-xs">
            {title}
          </h1>

          <div className="article-meta margin-bottom-md">
            <Calendar size={16} /> {article.created_at ? article.created_at.substring(0, 10) : ''}
          </div>

          {/* PRD v2.0 Progress Bars */}
          <CapacityProgressBar current={article.volunteer_count || 0} max={article.max_capacity || 0} />
          <FundraisingProgressBar raised={article.fundraising_raised || 0} goal={article.fundraising_goal || 0} />

          {article.cover_image && (
            <img
              src={article.cover_image}
              alt={title}
              className="article-cover-media margin-bottom-lg"
            />
          )}

          <div className="article-content-body whitespace-pre-line">
            {content}
          </div>

          {/* Apply as Volunteer CTA if event has capacity */}
          {article.max_capacity > 0 && (
            <div className="card card-padding-md bg-highlight margin-top-lg text-center">
              <h3 className="card-heading-section">
                <Users size={20} className="icon-inline-primary" />
                {lang === 'zh-CN' ? '诚邀加入此活动的志愿服务行列' : 'Join Us as a Volunteer for this Event'}
              </h3>
              <p className="text-sm text-muted margin-bottom-md">
                {lang === 'zh-CN' ? '无私奉献，携手护持。点击下方按钮立即报名此活动志工。' : 'Register now to volunteer for this special event.'}
              </p>
              <Link to={`/volunteer?event_id=${article.id}`} className="btn btn-primary">
                <Users size={16} /> {lang === 'zh-CN' ? '立即报名此活动志工' : 'Apply as Event Volunteer'}
              </Link>
            </div>
          )}

          {/* Social Share Buttons */}
          <SocialShareButtons title={title} />
        </div>
      </section>
    </div>
  );
};
