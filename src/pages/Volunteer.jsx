// src/pages/Volunteer.jsx - Volunteer Application Component with Event Association

import { apiFetch } from '../../api/client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, CheckCircle, AlertCircle, Calendar, Clock, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';
import { CapacityProgressBar } from '../components/common/CapacityProgressBar';

export const Volunteer = () => {
  const { lang, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const preselectedEventId = searchParams.get('event_id') || '';

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    event_id: preselectedEventId,
    name: '',
    phone: '',
    email: '',
    skills: '',
    shift_slot: '',
    team_role: '',
    availability: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [qrCodeToken, setQrCodeToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiFetch('/api/news.php?status=published')
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          setEvents(res.data);
          if (preselectedEventId && !formData.event_id) {
            setFormData(prev => ({ ...prev, event_id: preselectedEventId }));
            const ev = res.data.find(e => String(e.id) === String(preselectedEventId));
            setSelectedEvent(ev);
          }
        }
      })
      .catch(() => setEvents([]));
  }, [preselectedEventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'event_id') {
      const ev = events.find(event => String(event.id) === String(value));
      setSelectedEvent(ev || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setQrCodeToken('');

    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMsg(t('volunteer.errRequired'));
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await apiFetch('/api/volunteers.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = res;

      if (json.status === 'success') {
        let finalMsg = t('volunteer.successMsg');
        if (json.data.status === 'waitlisted') {
          finalMsg = t('volunteer.waitlistedMsg');
        }
        setSuccessMsg(finalMsg);
        setQrCodeToken(json.data.qr_code_token || '');
        setFormData({ event_id: formData.event_id, name: '', phone: '', email: '', skills: '', shift_slot: '', team_role: '', availability: '' });
      } else {
        setErrorMsg(json.message || t('volunteer.errSubmit'));
      }
    } catch (err) {
      setErrorMsg(t('volunteer.errNetwork'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SeoHead title={t('nav.volunteers')} description={t('volunteer.metaDesc')} />

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
            <div className="alert-box alert-danger margin-bottom-md">
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="alert-box alert-success margin-bottom-md" data-testid="success-message">
              <CheckCircle size={20} /> {successMsg}
              {qrCodeToken && (
                <div className="qr-code-box margin-top-sm" data-testid="qr-code">
                  <p><strong>{t('volunteer.checkinQrLabel')}</strong></p>
                  <div className="qr-placeholder bg-light padding-md text-center margin-top-xs border-radius-sm">
                    <code>{qrCodeToken}</code>
                  </div>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <Calendar size={14} className="inline-icon" /> {t('volunteer.selectEvent')}
              </label>
              <select
                name="event_id"
                value={formData.event_id}
                onChange={handleChange}
                required
              >
                <option value="">{t('volunteer.selectEventPlaceholder')}</option>
                {events.map(item => (
                  <option key={item.id} value={item.id}>
                    {lang === 'zh-CN' ? item.title_zh : item.title_en} [{t(`news.${item.category}`) || item.category}]
                  </option>
                ))}
              </select>
            </div>

            {selectedEvent && selectedEvent.max_capacity > 0 && (
              <CapacityProgressBar 
                current={selectedEvent.current_volunteers || 0} 
                max={selectedEvent.max_capacity} 
              />
            )}

            <div className="form-group">
              <label>{t('volunteer.name')} *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder={t('volunteer.placeholderName')} />
            </div>

            <div className="form-group">
              <label>{t('volunteer.phone')} *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder={t('volunteer.placeholderPhone')} />
            </div>

            <div className="form-group">
              <label>{t('volunteer.email')} *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder={t('volunteer.placeholderEmail')} />
            </div>

            <div className="form-group">
              <label>
                <Clock size={14} className="inline-icon" /> {t('volunteer.shiftSlot')}
              </label>
              <select name="shift_slot" value={formData.shift_slot} onChange={handleChange}>
                <option value="">{t('volunteer.shiftAny')}</option>
                <option value="Morning (9am - 1pm)">{t('volunteer.shiftMorning')}</option>
                <option value="Afternoon (1pm - 5pm)">{t('volunteer.shiftAfternoon')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <Tag size={14} className="inline-icon" /> {t('volunteer.teamRole')}
              </label>
              <select name="team_role" value={formData.team_role} onChange={handleChange}>
                <option value="">{t('volunteer.roleAny')}</option>
                <option value="Registration">{t('volunteer.roleReg')}</option>
                <option value="Logistics">{t('volunteer.roleLogistics')}</option>
                <option value="Promotion">{t('volunteer.rolePromo')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('volunteer.skills')}</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder={t('volunteer.placeholderSkills')} />
            </div>

            <div className="form-group">
              <label>{t('volunteer.availability')}</label>
              <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder={t('volunteer.placeholderAvailability')} />
            </div>

            <button type="submit" className="btn btn-primary btn-full-width margin-top-md" disabled={isSubmitting}>
              {isSubmitting ? t('ui.submitting') : t('volunteer.submitBtn')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

