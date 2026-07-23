// src/pages/About.jsx - About Us Component

import React from 'react';
import { ShieldCheck, Heart, BookOpen, Music } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const About = () => {
  const { t } = useLanguage();

  return (
    <div>
      <SeoHead title={t('nav.about')} description={t('about.metaDesc')} />

      <section className="page-header-banner">
        <div className="container text-center">
          <h1 className="section-title">{t('nav.about')}</h1>
          <p className="section-subtitle">{t('about.historyTitle')}</p>
        </div>
      </section>

      <section className="container section-container">
        <div className="max-w-wide">
          <div className="card card-padding-lg margin-bottom-lg">
            <h2 className="card-heading-primary">
              {t('about.historyTitle')}
            </h2>
            <p className="content-paragraph">
              {t('about.historyText')}
            </p>
          </div>

          <h2 className="section-title">{t('about.missionTitle')}</h2>
          <div className="grid-layout margin-top-md margin-bottom-lg">
            <div className="card card-padding-sm">
              <BookOpen size={32} className="card-icon-primary" />
              <p className="card-feature-text">{t('about.m1')}</p>
            </div>
            <div className="card card-padding-sm">
              <Heart size={32} className="card-icon-primary" />
              <p className="card-feature-text">{t('about.m2')}</p>
            </div>
            <div className="card card-padding-sm">
              <ShieldCheck size={32} className="card-icon-primary" />
              <p className="card-feature-text">{t('about.m3')}</p>
            </div>
            <div className="card card-padding-sm">
              <Music size={32} className="card-icon-primary" />
              <p className="card-feature-text">{t('about.m4')}</p>
            </div>
          </div>

          <div className="card card-padding-lg">
            <h2 className="card-heading-primary">
              {t('about.orgTitle')}
            </h2>
            <p className="content-paragraph">
              {t('about.orgDesc')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
