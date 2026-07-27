import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="page-container home-page">
      <Helmet>
        <title>{t('nav.home')} | HUI YIN SEH</title>
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <div className="hero-content py-5">
            <h1 className="display-4 font-weight-bold mb-3">{t('hero.title')}</h1>
            <p className="hero-subtitle lead mb-4">{t('hero.subtitle')}</p>
            <div className="hero-actions gap-3 d-flex justify-content-center">
              <Link to="/donation" className="btn btn-primary btn-lg">{t('hero.donateBtn')}</Link>
              <Link to="/volunteers" className="btn btn-outline-primary btn-lg">{t('hero.volunteerBtn')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Overview */}
      <section className="section about-overview py-5">
        <div className="container text-center">
          <h2 className="section-title mb-2">{t('home.aboutSectionTitle')}</h2>
          <p className="section-subtitle text-muted mb-4">{t('home.aboutSectionSub')}</p>
          <p className="max-w-2xl mx-auto mb-4" style={{maxWidth: '800px', margin: '0 auto'}}>{t('home.aboutText')}</p>
          <Link to="/about" className="btn btn-link d-inline-flex align-items-center">
            {t('home.readMore')} <ArrowRight size={16} className="ms-1" />
          </Link>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section impact-section bg-light py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">{t('home.impactTitle')}</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="stat-card p-4 bg-white rounded shadow-sm h-100">
                <Heart size={48} className="text-primary mb-3" />
                <h3 className="display-5 font-weight-bold">{t('home.bloodCount')}</h3>
                <p className="text-muted mb-0">{t('home.bloodLabel')}</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="stat-card p-4 bg-white rounded shadow-sm h-100">
                <Users size={48} className="text-primary mb-3" />
                <h3 className="display-5 font-weight-bold">{t('home.memberCount')}</h3>
                <p className="text-muted mb-0">{t('home.memberLabel')}</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="stat-card p-4 bg-white rounded shadow-sm h-100">
                <Calendar size={48} className="text-primary mb-3" />
                <h3 className="display-5 font-weight-bold">{t('home.yearsCount')}</h3>
                <p className="text-muted mb-0">{t('home.yearsLabel')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="section quick-links py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card callout-card h-100 p-4 border-0 bg-primary text-white text-center rounded-lg shadow-sm">
                <h3 className="mb-3">{t('home.donationCalloutTitle')}</h3>
                <p className="mb-4">{t('home.donationCalloutText')}</p>
                <div>
                  <Link to="/donation" className="btn btn-light">{t('hero.donateBtn')}</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card callout-card h-100 p-4 border-0 bg-secondary text-white text-center rounded-lg shadow-sm">
                <h3 className="mb-3">{t('home.newsSectionTitle')}</h3>
                <p className="mb-4">{t('home.newsSectionSub')}</p>
                <div>
                  <Link to="/news" className="btn btn-light">{t('home.viewAllNews')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
