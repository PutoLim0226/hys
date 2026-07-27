import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-container bg-light min-vh-100">
      <Helmet><title>{t('nav.contact')} | HUI YIN SEH</title></Helmet>
      <div className="bg-primary text-white py-5 mb-5 text-center">
        <div className="container">
          <h1 className="display-4 font-weight-bold">{t('nav.contact')}</h1>
          <p className="lead">{t('contact.metaDesc')}</p>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row">
          <div className="col-lg-5 mb-5 mb-lg-0">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-5">
                <h2 className="h3 text-primary mb-4 font-weight-bold">{t('contact.addressTitle')}</h2>
                <div className="d-flex mb-4 align-items-start">
                  <MapPin size={24} className="text-primary me-3 flex-shrink-0" />
                  <p className="mb-0 text-muted lead">{t('contact.address')}</p>
                </div>
                <div className="d-flex mb-4 align-items-center">
                  <Phone size={24} className="text-primary me-3 flex-shrink-0" />
                  <p className="mb-0 text-muted lead">{t('contact.phone')}</p>
                </div>
                <div className="d-flex mb-4 align-items-center">
                  <Mail size={24} className="text-primary me-3 flex-shrink-0" />
                  <p className="mb-0 text-muted lead">{t('contact.email')}</p>
                </div>
                <div className="d-flex align-items-center">
                  <Clock size={24} className="text-primary me-3 flex-shrink-0" />
                  <p className="mb-0 text-muted lead">{t('contact.hours')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-5">
                <h2 className="h3 text-primary mb-4 font-weight-bold">{t('contact.formTitle')}</h2>
                {submitted ? (
                  <div className="alert alert-success py-4 text-center">
                    <h4 className="alert-heading mb-0">✅ {t('contact.successMsg')}</h4>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">{t('volunteer.name')}</label>
                        <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">{t('volunteer.email')}</label>
                        <input type="email" className="form-control" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">{t('contact.message')}</label>
                      <textarea className="form-control" rows="5" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-3 font-weight-bold">{t('contact.sendBtn')}</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
