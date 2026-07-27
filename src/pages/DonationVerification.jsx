// src/pages/DonationVerification.jsx - Public Donation Verification List Page

import { apiFetch } from '../../api/client';
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SeoHead } from '../components/SeoHead';

export const DonationVerification = () => {
  const { lang, t } = useLanguage();
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
      <SeoHead title={lang === 'zh-CN' ? '捐款征信与感谢芳名录' : 'Donation Verification List'} />

      <section className="page-header-banner">
        <div className="container text-center">
          <h1 className="section-title">{lang === 'zh-CN' ? '捐款征信与感谢芳名录' : 'Donation Verification & Gratitude Roll'}</h1>
          <p className="section-subtitle">
            {lang === 'zh-CN' ? '公开透明・对账核实・感恩社会各界热心护持' : 'Transparent & Verified Public Donation Records'}
          </p>
        </div>
      </section>

      <section className="container section-container">
        <div className="card card-padding-lg margin-bottom-lg">
          <div className="flex-row-between margin-bottom-md flex-wrap-gap">
            <div>
              <h2 className="card-heading-section margin-bottom-xs">
                <ShieldCheck size={24} className="icon-inline-primary" />
                {lang === 'zh-CN' ? '已对账确认善款名册' : 'Verified Donation Roster'}
              </h2>
              <p className="text-muted text-sm">
                {lang === 'zh-CN' ? '本名册仅显示经慧音社财政组核对无误之转账记录' : 'Only bank/e-wallet transfer records verified by Hui Yin Seh finance unit are displayed.'}
              </p>
            </div>

            <div className="search-input-wrapper max-w-sm">
              <Search size={16} className="search-icon-inside" />
              <input
                type="text"
                className="search-input-field"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'zh-CN' ? '搜索姓名...' : 'Search donor name...'}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{lang === 'zh-CN' ? '捐款人 / 芳名' : 'Donor Name'}</th>
                  <th>{lang === 'zh-CN' ? '捐赠金额' : 'Amount (MYR)'}</th>
                  <th>{lang === 'zh-CN' ? '付款方式' : 'Payment Method'}</th>
                  <th>{lang === 'zh-CN' ? '对账状态' : 'Audit Status'}</th>
                  <th>{lang === 'zh-CN' ? '对账日期' : 'Verified Date'}</th>
                  <th>{lang === 'zh-CN' ? '电子凭证' : 'Receipt / Certificate'}</th>
                </tr>
              </thead>
              <tbody>
                {donations.length > 0 ? (
                  donations.map(item => (
                    <tr key={item.id}>
                      <td className="font-bold">{item.donor_name}</td>
                      <td className="font-bold text-primary">MYR {parseFloat(item.amount).toFixed(2)}</td>
                      <td>{item.payment_method.toUpperCase()}</td>
                      <td><span className="badge badge-confirmed"><ShieldCheck size={12} /> 已对账</span></td>
                      <td className="text-xs">{item.created_at ? item.created_at.substring(0, 10) : ''}</td>
                      <td>
                        <a
                          href={`/api/receipt_pdf.php?id=${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-secondary"
                        >
                          <Award size={14} /> {lang === 'zh-CN' ? '查看感谢状' : 'View Receipt'}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted card-padding-md">
                      {loading ? (lang === 'zh-CN' ? '加载征信名册中...' : 'Loading records...') : (lang === 'zh-CN' ? '暂无符合条件的对账记录' : 'No verified donation records found.')}
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
