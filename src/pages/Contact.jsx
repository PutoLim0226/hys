// src/pages/Contact.jsx - Contact Us Component

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const Contact = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <SeoHead title={t('nav.contact')} description={t('contact.metaDesc')} />

      <section className="page-header-banner">
        <div className="container text-center">
          <h1 className="section-title">{t('contact.title')}</h1>
          <p className="section-subtitle">{t('contact.addressTitle')}</p>
        </div>
      </section>

      <section className="container section-container">
        <div className="grid-single-col">
          
          {/* Address & Info */}
          <div className="card card-padding-md">
            <h2 className="card-heading-section">
              {t('contact.addressTitle')}
            </h2>
            <div className="contact-info-list">
              <div><MapPin size={20} className="icon-inline-primary" /> {t('contact.address')}</div>
              <div><Phone size={20} className="icon-inline-primary" /> {t('contact.phone')}</div>
              <div><Mail size={20} className="icon-inline-primary" /> {t('contact.email')}</div>
              <div><Clock size={20} className="icon-inline-primary" /> {t('contact.hours')}</div>
            </div>

            {/* Embed Map */}
            <div className="map-embed-wrapper">
              <iframe
                title="Hui Yin Seh Location Map"
                src="https://maps.google.com/maps?q=30,%20Lintang%20Paya%20Terubong%203,%20Bandar%20Baru%20Air%20Itam,%2011060%20Ayer%20Itam,%20Pulau%20Pinang,%20Malaysia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                className="map-iframe"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card card-padding-md">
            <h2 className="card-heading-section">
              {t('contact.formTitle')}
            </h2>

            {submitted ? (
              <div className="alert-box alert-success text-center flex-col-center">
                <CheckCircle size={32} className="margin-bottom-xs" />
                <p className="font-bold text-lg">{t('contact.successMsg')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>{t('volunteer.name')} *</label>
                  <input type="text" required placeholder="Your Full Name" />
                </div>
                <div className="form-group">
                  <label>{t('volunteer.email')} *</label>
                  <input type="email" required placeholder="Your Email Address" />
                </div>
                <div className="form-group">
                  <label>{t('contact.message')} *</label>
                  <textarea required placeholder="Write your inquiry or message here..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full-width">
                  <Send size={18} /> {t('contact.sendBtn')}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
