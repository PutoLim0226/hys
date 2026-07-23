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
      setErrorMsg('请填写必填栏位 (Please fill in name, phone, and email)');
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
      setErrorMsg('无法发送报名资料，请检查网络连接或稍后再试 (Connection error, please try again)');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SeoHead title={t('nav.volunteer')} description={t('volunteer.metaDesc')} />

      <section className="page-header-banner">
        <div className="container text-center">
          <h1 className="section-title">{t('volunteer.title')}</h1>
          <p className="section-subtitle">{t('volunteer.subtitle')}</p>
        </div>
      </section>

      <section className="container section-container">
        <div className="card max-w-form card-padding-lg margin-center">
          <h2 className="card-heading-section text-center">
            <Users size={24} className="icon-inline-primary" />
            {t('volunteer.formTitle')}
          </h2>

          {errorMsg && (
            <div className="alert-box alert-danger">
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="alert-box alert-success">
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
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. 献血登记、活动主持人、合唱伴奏" />
            </div>

            <div className="form-group">
              <label>{t('volunteer.availability')}</label>
              <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder="e.g. 周末上午 / 项目支持" />
            </div>

            <button type="submit" className="btn btn-primary btn-full-width margin-top-md" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : t('volunteer.submitBtn')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
