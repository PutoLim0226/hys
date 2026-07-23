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

      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '3rem 0', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="section-title">{t('contact.title')}</h1>
          <p className="section-subtitle">{t('contact.addressTitle')}</p>
        </div>
      </section>

      <section className="container" style={{ padding: '3rem 1.25rem' }}>
        <div className="grid-layout" style={{ gridTemplateColumns: '1fr', gap: '2.5rem' }}>
          
          {/* Address & Info */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
              {t('contact.addressTitle')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              <div><MapPin size={20} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> {t('contact.address')}</div>
              <div><Phone size={20} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> {t('contact.phone')}</div>
              <div><Mail size={20} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> {t('contact.email')}</div>
              <div><Clock size={20} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> {t('contact.hours')}</div>
            </div>

            {/* Embed Map */}
            <div style={{ marginTop: '2rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <iframe
                title="Hui Yin Seh Location Map"
                src="https://maps.google.com/maps?q=30,%20Lintang%20Paya%20Terubong%203,%20Bandar%20Baru%20Air%20Itam,%2011060%20Ayer%20Itam,%20Pulau%20Pinang,%20Malaysia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
              {t('contact.formTitle')}
            </h2>

            {submitted ? (
              <div style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success-color)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <CheckCircle size={32} style={{ margin: '0 auto 0.5rem' }} />
                <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{t('contact.successMsg')}</p>
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
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>
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
