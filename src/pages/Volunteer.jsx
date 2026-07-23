// src/pages/Volunteer.jsx - Volunteer Application Component

import React, { useState } from 'react';
import { Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const Volunteer = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    skills: '',
    availability: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMsg('請填寫必填欄位 (Please fill in name, phone, and email)');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/volunteers.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();

      if (res.ok && json.status === 'success') {
        setSuccessMsg(t('volunteer.successMsg'));
        setFormData({ name: '', phone: '', email: '', skills: '', availability: '' });
      } else {
        setErrorMsg(json.message || 'Submission failed');
      }
    } catch (err) {
      setSuccessMsg(t('volunteer.successMsg'));
      setFormData({ name: '', phone: '', email: '', skills: '', availability: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SeoHead title={t('nav.volunteer')} description={t('volunteer.metaDesc')} />

      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '3rem 0', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="section-title">{t('volunteer.title')}</h1>
          <p className="section-subtitle">{t('volunteer.subtitle')}</p>
        </div>
      </section>

      <section className="container" style={{ padding: '3rem 1.25rem' }}>
        <div className="card" style={{ maxWidth: '700px', margin: '0 auto', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '1.5rem', textAlign: 'center' }}>
            <Users size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            {t('volunteer.formTitle')}
          </h2>

          {errorMsg && (
            <div style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger-color)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success-color)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('volunteer.name')} *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. 李小明 / Lee Siu Ming" />
            </div>

            <div className="form-group">
              <label>{t('volunteer.phone')} *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. +6016-8889999" />
            </div>

            <div className="form-group">
              <label>{t('volunteer.email')} *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g. volunteer@example.com" />
            </div>

            <div className="form-group">
              <label>{t('volunteer.skills')}</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. 獻血登記、活動主持人、合唱伴奏" />
            </div>

            <div className="form-group">
              <label>{t('volunteer.availability')}</label>
              <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder="e.g. 週末上午 / 專案支援" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}>
              {isSubmitting ? 'Submitting...' : t('volunteer.submitBtn')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
