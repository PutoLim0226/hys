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
              <ArrowLeft size={14} /> {t('admin.backToDashboard')}
            </Link>
            <h1 className="admin-page-title">{t('admin.donationMgmt')}</h1>
          </div>

          <div className="filter-button-group flex-row-gap-sm flex-wrap">
            {['all', 'pending', 'confirmed', 'rejected'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
              >
                {st === 'all' ? t('ui.all') : t(`admin.${st}`)}
              </button>
            ))}
            <a
              href="/api/admin/export_csv.php?type=donations"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-success"
            >
              <Download size={14} /> {t('admin.exportCsv')}
            </a>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{t('admin.donorName')}</th>
                <th>{t('admin.colPhone')}</th>
                <th>{t('admin.amount')}</th>
                <th>{t('admin.colMethod')}</th>
                <th>{t('admin.receipt')}</th>
                <th>{t('admin.status')}</th>
                <th>{t('admin.colSubmittedAt')}</th>
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
                      <span className="text-muted">{t('admin.noReceipt')}</span>
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
                        title={t('admin.confirmAction')}
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'rejected')}
                        className="btn btn-sm btn-danger"
                        title={t('admin.rejectAction')}
                      >
                        <XIcon size={14} />
                      </button>
                      {item.status === 'confirmed' && (
                        <a 
                          href={`/api/receipt_pdf.php?id=${item.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-sm btn-secondary"
                          title={t('admin.printReceipt')}
                        >
                          <Award size={14} />
                        </a>
                      )}
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
                alt={t('admin.receiptAlt')}
                className="modal-lightbox-img"
              />
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};
