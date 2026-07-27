import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Volunteers = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', skills: '', availability: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-container bg-light min-vh-100">
      <Helmet><title>{t('nav.volunteers')} | HUI YIN SEH</title></Helmet>
      <div className="bg-primary text-white py-5 mb-5 text-center">
        <div className="container">
          <h1 className="display-4 font-weight-bold">{t('nav.volunteers')}</h1>
          <p className="lead">{t('volunteer.subtitle')}</p>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                <h2 className="h3 text-primary mb-4 text-center font-weight-bold">{t('volunteer.formTitle')}</h2>
                {submitted ? (
                  <div className="alert alert-success text-center py-4">
                    <h4 className="alert-heading mb-3">✅ {t('volunteer.successMsg')}</h4>
                    <button className="btn btn-outline-success mt-3" onClick={() => setSubmitted(false)}>
                      {lang === 'zh-CN' ? '重新填寫' : 'Submit Another'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">{t('volunteer.name')}</label>
                      <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">{t('volunteer.phone')}</label>
                        <input type="tel" className="form-control" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">{t('volunteer.email')}</label>
                        <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">{t('volunteer.skills')}</label>
                      <textarea className="form-control" rows="3" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})}></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">{t('volunteer.availability')}</label>
                      <input type="text" className="form-control" value={formData.availability} onChange={(e) => setFormData({...formData, availability: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-3 font-weight-bold">{t('volunteer.submitBtn')}</button>
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
