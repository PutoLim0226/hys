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

      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '3rem 0', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="section-title">{t('nav.about')}</h1>
          <p className="section-subtitle">{t('about.historyTitle')}</p>
        </div>
      </section>

      <section className="container" style={{ padding: '4rem 1.25rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-color)', marginBottom: '1rem', fontWeight: 700 }}>
              {t('about.historyTitle')}
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              {t('about.historyText')}
            </p>
          </div>

          <h2 className="section-title">{t('about.missionTitle')}</h2>
          <div className="grid-layout" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <BookOpen size={32} color="var(--primary-color)" style={{ marginBottom: '0.75rem' }} />
              <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>{t('about.m1')}</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <Heart size={32} color="var(--primary-color)" style={{ marginBottom: '0.75rem' }} />
              <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>{t('about.m2')}</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <ShieldCheck size={32} color="var(--primary-color)" style={{ marginBottom: '0.75rem' }} />
              <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>{t('about.m3')}</p>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <Music size={32} color="var(--primary-color)" style={{ marginBottom: '0.75rem' }} />
              <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>{t('about.m4')}</p>
            </div>
          </div>

          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-color)', marginBottom: '1rem', fontWeight: 700 }}>
              {t('about.orgTitle')}
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              {t('about.orgDesc')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
