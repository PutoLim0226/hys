// src/pages/admin/AdminVolunteers.jsx - Volunteer Audit & Management

import { apiFetch } from '../../api/client';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Archive, Eye, LogOut, Sun, Moon, Globe, Download, QrCode } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SeoHead } from '../../components/SeoHead';
import { Modal } from '../../components/common/Modal';
import { AdminHeader } from '../../components/admin/AdminHeader';

import logoImg from '../../assets/img/logo.png';

export const AdminVolunteers = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();

  const [volunteers, setVolunteers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const fetchVolunteers = () => {
    apiFetch(`/api/admin/volunteers.php?status=${filterStatus}`, {
      headers: getAuthHeaders()
    })
      
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          setVolunteers(res.data);
        }
      })
      .catch(() => {
        setVolunteers([]);
      });
  };

  useEffect(() => {
    fetchVolunteers();
  }, [filterStatus]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await apiFetch('/api/admin/volunteer_update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (err) {
      console.error('Error updating volunteer status:', err);
    } finally {
      fetchVolunteers();
    }
  };

  return (
    <div className="admin-page-wrapper flex-1">
      <SeoHead title={t('admin.volunteerMgmt')} />

      {/* Standalone Admin Header Bar */}
      <AdminHeader />

      <div className="container admin-container">
        <div className="admin-header-bar">
          <div>
            <Link to="/admin/dashboard" className="btn btn-sm btn-secondary margin-bottom-xs">
              <ArrowLeft size={14} /> {t('admin.backToDashboard')}
            </Link>
            <h1 className="admin-page-title">{t('admin.volunteerMgmt')}</h1>
          </div>

          <div className="filter-button-group flex-row-gap-sm flex-wrap">
            {['all', 'pending', 'approved', 'waitlisted', 'checked_in', 'archived'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
              >
                {st === 'all' ? t('ui.all') : t(`admin.${st}`)}
              </button>
            ))}
            <a
              href="/api/admin/export_csv.php?type=volunteers"
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
                <th>{t('admin.colName')}</th>
                <th>{t('admin.colTargetEvent')}</th>
                <th>{t('admin.colShiftRole')}</th>
                <th>{t('admin.colPhone')}</th>
                <th>{t('admin.status')}</th>
                <th>{t('admin.colAppliedAt')}</th>
                <th>{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map(item => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td className="font-bold">{item.name}</td>
                  <td>
                    <span className="badge badge-pending">
                      {lang === 'zh-CN' ? (item.event_title_zh || t('admin.generalSupport')) : (item.event_title_en || t('admin.generalSupport'))}
                    </span>
                  </td>
                  <td className="text-xs">
                    {item.shift_slot && <div>{item.shift_slot}</div>}
                    {item.team_role && <div><strong className="text-primary">{item.team_role}</strong></div>}
                  </td>
                  <td>{item.phone}</td>
                  <td>
                    <span className={`badge badge-${item.status}`}>
                      {t(`admin.${item.status}`)}
                    </span>
                  </td>
                  <td className="text-xs">{item.created_at}</td>
                  <td>
                    <div className="flex-row-gap-xs">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setSelectedVolunteer(item)}
                        title={t('admin.viewDetails')}
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'approved')}
                        className="btn btn-sm btn-success"
                        title={t('admin.approveAction')}
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'checked_in')}
                        className="btn btn-sm btn-primary"
                        title={t('admin.checkinAction')}
                      >
                        <QrCode size={14} />
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'archived')}
                        className="btn btn-sm btn-danger"
                        title={t('admin.archiveAction')}
                      >
                        <Archive size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Volunteer Details Modal */}
        <Modal isOpen={!!selectedVolunteer} onClose={() => setSelectedVolunteer(null)} title={t('admin.volunteerDetailTitle')}>
          {selectedVolunteer && (
            <div className="volunteer-detail-body">
              <p><strong>{t('admin.colTargetEvent')}: </strong> {lang === 'zh-CN' ? (selectedVolunteer.event_title_zh || t('admin.generalSupport')) : (selectedVolunteer.event_title_en || t('admin.generalSupport'))}</p>
              <p><strong>{t('admin.colName')}: </strong> {selectedVolunteer.name}</p>
              <p><strong>{t('admin.colPhone')}: </strong> {selectedVolunteer.phone}</p>
              <p><strong>{t('admin.colEmail')}: </strong> {selectedVolunteer.email}</p>
              <p><strong>{t('volunteer.shiftSlot')}: </strong> {selectedVolunteer.shift_slot || '-'}</p>
              <p><strong>{t('volunteer.teamRole')}: </strong> {selectedVolunteer.team_role || '-'}</p>
              <p><strong>{t('admin.colSkills')}: </strong> {selectedVolunteer.skills}</p>
              <p><strong>{t('admin.colAvailability')}: </strong> {selectedVolunteer.availability}</p>
              <p><strong>{t('admin.status')}: </strong> <span className={`badge badge-${selectedVolunteer.status}`}>{t(`admin.${selectedVolunteer.status}`)}</span></p>
              {selectedVolunteer.qr_code_token && (
                <p><strong>{t('admin.qrCodeToken')}: </strong> <code>{selectedVolunteer.qr_code_token}</code></p>
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

