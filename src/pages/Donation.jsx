import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Donation = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', amount: '', method: 'TNG', receipt: null });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-container bg-light min-vh-100">
      <Helmet><title>{t('nav.donation')} | HUI YIN SEH</title></Helmet>
      <div className="bg-primary text-white py-5 mb-5 text-center">
        <div className="container">
          <h1 className="display-4 font-weight-bold">{t('nav.donation')}</h1>
          <p className="lead">{t('donation.intro')}</p>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-5 text-center">
                <h2 className="h3 text-primary mb-4 font-weight-bold">{t('donation.bankInfoTitle')}</h2>
                <p className="lead text-muted mb-4">{t('donation.bankInfoDesc')}</p>
                <div className="p-4 bg-light rounded d-inline-block">
                  <div style={{width: '200px', height: '200px', backgroundColor: '#e9ecef', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6c757d', fontWeight: 'bold'}}>
                    [QR Code Placeholder]
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                <h2 className="h3 text-primary mb-4 text-center font-weight-bold">{t('donation.formTitle')}</h2>
                {submitted ? (
                  <div className="alert alert-success text-center py-4">
                    <h4 className="alert-heading mb-3">✅ {t('donation.successMsg')}</h4>
                    <button className="btn btn-outline-success mt-3" onClick={() => setSubmitted(false)}>
                      {lang === 'zh-CN' ? '提交新捐款' : 'Submit Another'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">{t('donation.nameLabel')}</label>
                      <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">{t('donation.phoneLabel')}</label>
                        <input type="tel" className="form-control" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">{t('donation.amountLabel')}</label>
                        <input type="number" className="form-control" required min="1" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">{t('donation.uploadLabel')}</label>
                      <input type="file" className="form-control" accept="image/png, image/jpeg, image/webp" onChange={(e) => setFormData({...formData, receipt: e.target.files[0]})} />
                      <div className="form-text">{t('donation.uploadHint')}</div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-3 font-weight-bold">{t('donation.submitBtn')}</button>
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
