// src/pages/admin/AdminDonations.jsx - Donation Receipt Audit Management

import { apiFetch } from '../../api/client';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X as XIcon, Image as ImageIcon, LogOut, Sun, Moon, Globe, Download, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SeoHead } from '../../components/SeoHead';
import { Modal } from '../../components/common/Modal';
import { AdminHeader } from '../../components/admin/AdminHeader';

import logoImg from '../../assets/img/logo.png';

export const AdminDonations = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeReceiptUrl, setActiveReceiptUrl] = useState(null);

  const fetchDonations = () => {
    apiFetch(`/api/admin/donations.php?status=${filterStatus}`, {
      headers: getAuthHeaders()
    })
      
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          setDonations(res.data);
        }
      })
      .catch(() => {
        setDonations([]);
      });
  };

  useEffect(() => {
    fetchDonations();
  }, [filterStatus]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await apiFetch('/api/admin/donation_update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (err) {
      console.error('Error updating donation status:', err);
    } finally {
      fetchDonations();
    }
  };

  return (
    <div className="admin-page-wrapper flex-1">
      <SeoHead title={t('admin.donationMgmt')} />

      {/* Standalone Admin Header Bar */}
      <AdminHeader />

      <div className="container admin-container">
        <div className="admin-header-bar">
          <div>
            <Link to="/admin/dashboard" className="btn btn-sm btn-secondary margin-bottom-xs">
              <ArrowLeft size={14} /> {lang === 'zh-CN' ? '返回仪表板' : 'Back to Dashboard'}
            </Link>
            <h1 className="admin-page-title">{t('admin.donationMgmt')}</h1>
          </div>

          <div className="filter-button-group flex-row-gap-sm">
            {['all', 'pending', 'confirmed', 'rejected'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
              >
                {st === 'all' ? (lang === 'zh-CN' ? '全部' : 'All') : t(`admin.${st}`)}
              </button>
            ))}
            <a
              href="/api/admin/export_csv.php?type=donations"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-success"
            >
              <Download size={14} /> {lang === 'zh-CN' ? '导出 Excel/CSV' : 'Export CSV'}
            </a>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{t('admin.donorName')}</th>
                <th>{lang === 'zh-CN' ? '联系电话' : 'Phone'}</th>
                <th>{t('admin.amount')}</th>
                <th>{lang === 'zh-CN' ? '付款方式' : 'Method'}</th>
                <th>{t('admin.receipt')}</th>
                <th>{t('admin.status')}</th>
                <th>{lang === 'zh-CN' ? '提交时间' : 'Submitted At'}</th>
                <th>{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(item => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td className="font-bold">{item.donor_name}</td>
                  <td>{item.phone}</td>
                  <td className="font-bold text-primary">MYR {parseFloat(item.amount).toFixed(2)}</td>
                  <td>{item.payment_method.toUpperCase()}</td>
                  <td>
                    {item.receipt_image_url ? (
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setActiveReceiptUrl(item.receipt_image_url)}
                      >
                        <ImageIcon size={14} /> {t('admin.viewReceipt')}
                      </button>
                    ) : (
                      <span className="text-muted">{lang === 'zh-CN' ? '无截图' : 'No Receipt'}</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge badge-${item.status}`}>
                      {t(`admin.${item.status}`)}
                    </span>
                  </td>
                  <td className="text-xs">{item.created_at}</td>
                  <td>
                    <div className="flex-row-gap-xs">
                      <button
                        onClick={() => updateStatus(item.id, 'confirmed')}
                        className="btn btn-sm btn-success"
                        title={lang === 'zh-CN' ? '确认对账' : 'Confirm'}
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'rejected')}
                        className="btn btn-sm btn-danger"
                        title={lang === 'zh-CN' ? '退回/无效' : 'Reject'}
                      >
                        <XIcon size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Screenshot Lightbox Modal */}
        <Modal isOpen={!!activeReceiptUrl} onClose={() => setActiveReceiptUrl(null)} title={t('admin.receipt')}>
          {activeReceiptUrl && (
            <div className="text-center">
              <img
                src={activeReceiptUrl}
                alt="Donation Receipt"
                className="modal-lightbox-img"
              />
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};
