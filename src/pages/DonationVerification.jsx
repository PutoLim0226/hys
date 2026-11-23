// src/pages/DonationVerification.jsx - Public Donation Verification List Page

import { apiFetch } from '../../api/client';
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const DonationVerification = () => {
  const { t } = useLanguage();
  const [donations, setDonations] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDonations = () => {
    setLoading(true);
    apiFetch(`/api/donations_public.php?q=${encodeURIComponent(query)}`)
      
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          setDonations(res.data);
        }
      })
      .catch(() => setDonations([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDonations();
  }, [query]);

  return (
    <div>
      <SeoHead title={t('donationVerify.title')} />

      <section className="page-header-banner">
        <div className="container text-center">
          <h1 className="section-title">{t('donationVerify.title')}</h1>
          <p className="section-subtitle">
            {t('donationVerify.subtitle')}
          </p>
        </div>
      </section>

      <section className="container section-container">
        <div className="card card-padding-lg margin-bottom-lg">
          <div className="flex-row-between margin-bottom-md flex-wrap-gap">
            <div>
              <h2 className="card-heading-section margin-bottom-xs">
                <ShieldCheck size={24} className="icon-inline-primary" />
                {t('donationVerify.rosterTitle')}
              </h2>
              <p className="text-muted text-sm">
                {t('donationVerify.rosterDesc')}
              </p>
            </div>

            <div className="search-input-wrapper max-w-sm">
              <Search size={16} className="search-icon-inside" />
              <input
                type="text"
                className="search-input-field"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('donationVerify.searchPlaceholder')}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t('donationVerify.colDonor')}</th>
                  <th>{t('donationVerify.colAmount')}</th>
                  <th>{t('donationVerify.colMethod')}</th>
                  <th>{t('donationVerify.colStatus')}</th>
                  <th>{t('donationVerify.colDate')}</th>
                  <th>{t('donationVerify.colReceipt')}</th>
                </tr>
              </thead>
              <tbody>
                {donations.length > 0 ? (
                  donations.map(item => (
                    <tr key={item.id}>
                      <td className="font-bold">{item.donor_name}</td>
                      <td className="font-bold text-primary">MYR {parseFloat(item.amount).toFixed(2)}</td>
                      <td>{item.payment_method.toUpperCase()}</td>
                      <td><span className="badge badge-confirmed"><ShieldCheck size={12} /> {t('donationVerify.verifiedBadge')}</span></td>
                      <td className="text-xs">{item.created_at ? item.created_at.substring(0, 10) : ''}</td>
                      <td>
                        <a
                          href={`/api/receipt_pdf.php?id=${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-secondary"
                        >
                          <Award size={14} /> {t('donationVerify.viewReceipt')}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted card-padding-md">
                      {loading ? t('donationVerify.loading') : t('donationVerify.empty')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
