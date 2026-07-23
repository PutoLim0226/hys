// src/pages/Donation.jsx - Online Donation & Receipt Submission Component

import React, { useState } from 'react';
import { Heart, QrCode, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const Donation = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    donor_name: '',
    phone: '',
    amount: '',
    payment_method: 'tng'
  });
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErrorMsg('');

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg(t('donation.fileSizeErr'));
      setReceiptFile(null);
      setReceiptPreview(null);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg(t('donation.fileTypeErr'));
      setReceiptFile(null);
      setReceiptPreview(null);
      return;
    }

    setReceiptFile(file);
    setReceiptPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.donor_name || !formData.phone || !formData.amount) {
      setErrorMsg('请填写完整信息 (Please complete all required fields)');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('donor_name', formData.donor_name);
      data.append('phone', formData.phone);
      data.append('amount', formData.amount);
      data.append('payment_method', formData.payment_method);
      if (receiptFile) {
        data.append('receipt', receiptFile);
      }

      const res = await fetch('/api/donations.php', {
        method: 'POST',
        body: data
      });

      const json = await res.json();

      if (res.ok && json.status === 'success') {
        setSuccessMsg(t('donation.successMsg'));
        setFormData({ donor_name: '', phone: '', amount: '', payment_method: 'tng' });
        setReceiptFile(null);
        setReceiptPreview(null);
      } else {
        setErrorMsg(json.message || 'Submission failed');
      }
    } catch (err) {
      setErrorMsg('无法发送捐款资料，请检查网络连接或稍后再试 (Connection error, please try again)');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SeoHead title={t('nav.donation')} description={t('donation.metaDesc')} />

      <section className="page-header-banner">
        <div className="container text-center">
          <h1 className="section-title">{t('donation.title')}</h1>
          <p className="section-subtitle">{t('donation.intro')}</p>
        </div>
      </section>

      <section className="container section-container">
        <div className="grid-single-col">
          
          {/* Static QR Code & Transfer Guide */}
          <div className="card card-padding-md text-center">
            <h2 className="card-heading-section">
              <QrCode size={24} className="icon-inline-primary" />
              {t('donation.bankInfoTitle')}
            </h2>
            <p className="card-subtext-secondary">
              {t('donation.bankInfoDesc')}
            </p>

            <div className="qr-code-wrapper">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="#FFFFFF"/>
                <rect x="10" y="10" width="60" height="60" fill="#E65100"/>
                <rect x="20" y="20" width="40" height="40" fill="#FFFFFF"/>
                <rect x="30" y="30" width="20" height="20" fill="#E65100"/>
                <rect x="130" y="10" width="60" height="60" fill="#E65100"/>
                <rect x="140" y="20" width="40" height="40" fill="#FFFFFF"/>
                <rect x="150" y="30" width="20" height="20" fill="#E65100"/>
                <rect x="10" y="130" width="60" height="60" fill="#E65100"/>
                <rect x="20" y="140" width="40" height="40" fill="#FFFFFF"/>
                <rect x="30" y="150" width="20" height="20" fill="#E65100"/>
                <rect x="80" y="80" width="40" height="40" fill="#F57C00"/>
                <path d="M90 90 H110 V110 H90 Z" fill="#FFFFFF"/>
                <rect x="80" y="20" width="20" height="40" fill="#212529"/>
                <rect x="140" y="90" width="40" height="20" fill="#212529"/>
                <rect x="90" y="140" width="50" height="50" fill="#212529"/>
              </svg>
              <div className="qr-title">
                DuitNow / Touch 'n Go eWallet
              </div>
              <div className="qr-subtitle">
                Account Name: HUI YIN SEH PENANG
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="card card-padding-md">
            <h2 className="card-heading-section">
              {t('donation.formTitle')}
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
                <label>{t('donation.nameLabel')} *</label>
                <input
                  type="text"
                  name="donor_name"
                  value={formData.donor_name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 陈大明 / Tan Tai Beng"
                />
              </div>

              <div className="form-group">
                <label>{t('donation.phoneLabel')} *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. +6012-3456789"
                />
              </div>

              <div className="form-group">
                <label>{t('donation.amountLabel')} *</label>
                <input
                  type="number"
                  name="amount"
                  min="1"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 100"
                />
              </div>

              <div className="form-group">
                <label>{t('donation.methodLabel')}</label>
                <select name="payment_method" value={formData.payment_method} onChange={handleInputChange}>
                  <option value="tng">Touch 'n Go eWallet</option>
                  <option value="duitnow">DuitNow QR / Bank Transfer</option>
                </select>
              </div>

              {/* Receipt File Upload */}
              <div className="form-group">
                <label>{t('donation.uploadLabel')}</label>
                <label className="file-uploader">
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />
                  <Upload size={32} className="icon-center-primary" />
                  <p className="file-uploader-text">
                    {receiptFile ? receiptFile.name : '点击选择文件 (Click to select image)'}
                  </p>
                  <span className="form-hint">{t('donation.uploadHint')}</span>
                </label>
              </div>

              {receiptPreview && (
                <div className="preview-container">
                  <img
                    src={receiptPreview}
                    alt="Receipt preview"
                    className="preview-image"
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-full-width"
                disabled={isSubmitting}
              >
                <Heart size={18} /> {isSubmitting ? t('donation.submitting') : t('donation.submitBtn')}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};
