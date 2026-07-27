// src/pages/admin/AdminVolunteers.jsx - Volunteer Audit & Management

import { apiFetch } from '../../api/client';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Archive, Eye, LogOut, Sun, Moon, Globe, Download } from 'lucide-react';
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
              <ArrowLeft size={14} /> {lang === 'zh-CN' ? '返回仪表板' : 'Back to Dashboard'}
            </Link>
            <h1 className="admin-page-title">{t('admin.volunteerMgmt')}</h1>
          </div>

          <div className="filter-button-group flex-row-gap-sm">
            {['all', 'pending', 'approved', 'archived'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
              >
                {st === 'all' ? (lang === 'zh-CN' ? '全部' : 'All') : t(`admin.${st}`)}
              </button>
            ))}
            <a
              href="/api/admin/export_csv.php?type=volunteers"
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
                <th>{lang === 'zh-CN' ? '姓名' : 'Name'}</th>
                <th>{lang === 'zh-CN' ? '报名活动 / 项目' : 'Target Event'}</th>
                <th>{lang === 'zh-CN' ? '联系电话' : 'Phone'}</th>
                <th>{lang === 'zh-CN' ? '专长 / 技能' : 'Skills'}</th>
                <th>{t('admin.status')}</th>
                <th>{lang === 'zh-CN' ? '报名时间' : 'Applied At'}</th>
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
                      {lang === 'zh-CN' ? (item.event_title_zh || '通用支援') : (item.event_title_en || 'General Support')}
                    </span>
                  </td>
                  <td>{item.phone}</td>
                  <td className="max-w-cell">{item.skills}</td>
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
                        title={lang === 'zh-CN' ? '查看详情' : 'View Details'}
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'approved')}
                        className="btn btn-sm btn-success"
                        title={lang === 'zh-CN' ? '审核通过' : 'Approve'}
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'archived')}
                        className="btn btn-sm btn-danger"
                        title={lang === 'zh-CN' ? '归档' : 'Archive'}
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
        <Modal isOpen={!!selectedVolunteer} onClose={() => setSelectedVolunteer(null)} title={lang === 'zh-CN' ? '志愿者详细报名资料' : 'Volunteer Application Details'}>
          {selectedVolunteer && (
            <div className="volunteer-detail-body">
              <p><strong>{lang === 'zh-CN' ? '报名活动：' : 'Target Event: '}</strong> {lang === 'zh-CN' ? (selectedVolunteer.event_title_zh || '通用支援') : (selectedVolunteer.event_title_en || 'General Support')}</p>
              <p><strong>{lang === 'zh-CN' ? '姓名：' : 'Name: '}</strong> {selectedVolunteer.name}</p>
              <p><strong>{lang === 'zh-CN' ? '电话：' : 'Phone: '}</strong> {selectedVolunteer.phone}</p>
              <p><strong>{lang === 'zh-CN' ? 'Email：' : 'Email: '}</strong> {selectedVolunteer.email}</p>
              <p><strong>{lang === 'zh-CN' ? '专长技能：' : 'Skills: '}</strong> {selectedVolunteer.skills}</p>
              <p><strong>{lang === 'zh-CN' ? '可配合时间：' : 'Availability: '}</strong> {selectedVolunteer.availability}</p>
              <p><strong>{lang === 'zh-CN' ? '报名状态：' : 'Status: '}</strong> <span className={`badge badge-${selectedVolunteer.status}`}>{t(`admin.${selectedVolunteer.status}`)}</span></p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};
