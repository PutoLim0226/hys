// src/pages/About.jsx - Dynamic About Us Component fetching live sections from API

import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, ShieldCheck, Music, Users, Award, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const About = () => {
  const { lang, t } = useLanguage();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/about.php')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          setSections(res.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const renderIcon = (name) => {
    switch (name) {
      case 'Heart': return <Heart size={32} className="card-icon-primary" />;
      case 'ShieldCheck': return <ShieldCheck size={32} className="card-icon-primary" />;
      case 'Music': return <Music size={32} className="card-icon-primary" />;
      case 'Users': return <Users size={32} className="card-icon-primary" />;
      case 'Award': return <Award size={32} className="card-icon-primary" />;
      case 'Globe': return <Globe size={32} className="card-icon-primary" />;
      default: return <BookOpen size={32} className="card-icon-primary" />;
    }
  };

  // Group sections: main history section, grid cards, and footer org section
  const historySec = sections.find(s => s.section_key === 'history') || sections[0];
  const gridSecs = sections.filter(s => s.section_key !== 'history' && s.section_key !== 'organization');
  const orgSec = sections.find(s => s.section_key === 'organization');

  return (
    <div>
      <SeoHead title={t('nav.about')} description={t('about.metaDesc')} />

      <section className="page-header-banner">
        <div className="container text-center">
          <h1 className="section-title">{t('nav.about')}</h1>
          <p className="section-subtitle">{lang === 'zh-CN' ? historySec?.title_zh : historySec?.title_en}</p>
        </div>
      </section>

      <section className="container section-container">
        <div className="max-w-wide">
          {/* Main History Card */}
          {historySec && (
            <div className="card card-padding-lg margin-bottom-lg">
              <h2 className="card-heading-primary">
                {lang === 'zh-CN' ? historySec.title_zh : historySec.title_en}
              </h2>
              <p className="content-paragraph whitespace-pre-line">
                {lang === 'zh-CN' ? historySec.content_zh : historySec.content_en}
              </p>
            </div>
          )}

          {/* Mission & Aim Grid */}
          {gridSecs.length > 0 && (
            <>
              <h2 className="section-title">{t('about.missionTitle')}</h2>
              <div className="grid-layout margin-top-md margin-bottom-lg">
                {gridSecs.map(sec => (
                  <div className="card card-padding-sm" key={sec.id}>
                    {renderIcon(sec.icon_name)}
                    <h4 className="font-bold margin-top-xs margin-bottom-xs">
                      {lang === 'zh-CN' ? sec.title_zh : sec.title_en}
                    </h4>
                    <p className="card-feature-text">
                      {lang === 'zh-CN' ? sec.content_zh : sec.content_en}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Organization Structure Card */}
          {orgSec && (
            <div className="card card-padding-lg">
              <h2 className="card-heading-primary">
                {lang === 'zh-CN' ? orgSec.title_zh : orgSec.title_en}
              </h2>
              <p className="content-paragraph whitespace-pre-line">
                {lang === 'zh-CN' ? orgSec.content_zh : orgSec.content_en}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
