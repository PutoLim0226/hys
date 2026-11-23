// src/pages/admin/AdminDashboard.jsx - Admin Overview, Analytics & CMS Hub

import { apiFetch } from '../../api/client';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Newspaper, HeartHandshake, Users, LogOut, PlusCircle, CheckSquare, Sun, Moon, Globe, Award, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SeoHead } from '../../components/SeoHead';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminKpiCards } from '../../components/admin/AdminKpiCards';

import logoImg from '../../assets/img/logo.png';

export const AdminDashboard = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { admin, logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    donations: { total_amount: 0.00, total_count: 0, pending_count: 0, confirmed_count: 0 },
    volunteers: {
      total_count: 0,
      pending_count: 0,
      approved_count: 0,
      list: []
    },
    news: { total_count: 0, published_count: 0, draft_count: 0, categories: {} }
  });

  useEffect(() => {
    apiFetch('/api/admin/dashboard_stats.php', {
      headers: getAuthHeaders()
    })
      .then(res => {
        if (res && res.status === 'success' && res.data) {
          setStats(res.data);
        }
      })
      .catch(() => {
        setStats({
          donations: { total_amount: 0.00, total_count: 0, pending_count: 0, confirmed_count: 0 },
          volunteers: { total_count: 0, pending_count: 0, approved_count: 0, list: [] },
          news: { total_count: 0, published_count: 0, draft_count: 0, categories: {} }
        });
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const pplUnit = t('admin.unit.people');

  return (
    <div className="admin-page-wrapper flex-1">
      <SeoHead title={t('admin.dashboard')} />

      {/* Standalone Admin Header Bar */}
      <AdminHeader />

      <div className="container admin-container">
        {/* Welcome Section */}
        <div className="admin-header-bar">
          <div>
            <h1 className="admin-page-title">{t('admin.dashboard')}</h1>
            <p className="admin-page-subtitle">
              {t('admin.welcomeBack')} <strong>{admin?.username || 'Admin'}</strong>
            </p>
          </div>
        </div>

        {/* Analytics & KPI Summary Cards */}
        <AdminKpiCards stats={stats} />

        {/* Volunteer Count per Event / Activity Breakdown */}
        <div className="card card-padding-md margin-bottom-lg">
          <div className="admin-header-bar margin-bottom-md">
            <div>
              <h2 className="card-heading-section margin-bottom-xs">
                <Award size={20} className="icon-inline-primary" />
                {t('admin.eventBreakdownTitle')}
              </h2>
              <p className="text-muted text-sm">
                {t('admin.eventBreakdownDesc')}
              </p>
            </div>
            <Link to="/admin/volunteers" className="btn btn-secondary btn-sm">
              <Users size={16} /> {t('admin.manageAllVolunteers')}
            </Link>
          </div>

          <div className="table-responsive">
            <table className="admin-table margin-bottom-md">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('admin.colEventName')}</th>
                  <th>{t('admin.category')}</th>
                  <th>{t('admin.colRegisteredCount')}</th>
                </tr>
              </thead>
              <tbody>
                {(stats.volunteers?.event_breakdown || []).map(ev => (
                  <tr key={ev.event_id}>
                    <td>#{ev.event_id}</td>
                    <td className="font-bold">{lang === 'zh-CN' ? ev.title_zh : ev.title_en}</td>
                    <td><span className="badge badge-pending">{t(`news.${ev.category}`) || ev.category}</span></td>
                    <td className="font-bold text-primary">{ev.count}{pplUnit ? ` ${pplUnit}` : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="card-heading-section margin-top-md margin-bottom-xs">
            <Users size={16} className="icon-inline-primary" />
            {t('admin.recentVolunteers')}
          </h3>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('admin.colName')}</th>
                  <th>{t('admin.colPhone')}</th>
                  <th>{t('admin.colTargetEvent')}</th>
                  <th>{t('admin.colSkills')}</th>
                  <th>{t('admin.status')}</th>
                </tr>
              </thead>
              <tbody>
                {(stats.volunteers?.list || []).map(v => (
                  <tr key={v.id}>
                    <td>#{v.id}</td>
                    <td className="font-bold">{v.name}</td>
                    <td>{v.phone}</td>
                    <td><span className="activity-skill-tag">{lang === 'zh-CN' ? (v.event_title_zh || t('admin.generalSupport')) : (v.event_title_en || t('admin.generalSupport'))}</span></td>
                    <td className="text-sm">{v.skills}</td>
                    <td>
                      <span className={`badge badge-${v.status}`}>
                        {t(`admin.${v.status}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CMS Management Quick Links */}
        <h2 className="card-heading-section margin-bottom-md">
          <ShieldCheck size={20} className="icon-inline-primary" />
          {t('admin.modules.sectionTitle')}
        </h2>
        <div className="grid-layout margin-bottom-lg">

          {/* Module 1: News CMS */}
          <div className="card card-padding-md">
            <div className="admin-module-header">
              <div className="admin-icon-box">
                <Newspaper size={32} className="card-icon-primary" />
              </div>
              <div>
                <h3 className="admin-module-title">{t('admin.newsCms')}</h3>
                <span className="admin-module-badge">{t('admin.modules.newsBadge')}</span>
              </div>
            </div>
            <p className="admin-module-desc">
              {t('admin.modules.newsDesc')}
            </p>
            <Link to="/admin/news" className="btn btn-primary btn-sm btn-full-width">
              <PlusCircle size={16} /> {t('admin.modules.newsBtn')}
            </Link>
          </div>

          {/* Module 2: Donation Audit */}
          {admin?.role !== 'staff' && (
            <div className="card card-padding-md">
              <div className="admin-module-header">
                <div className="admin-icon-box">
                  <HeartHandshake size={32} className="card-icon-primary" />
                </div>
                <div>
                  <h3 className="admin-module-title">{t('admin.donationMgmt')}</h3>
                  <span className="admin-module-badge">{t('admin.modules.donationsBadge')}</span>
                </div>
              </div>
              <p className="admin-module-desc">
                {t('admin.modules.donationsDesc')}
              </p>
              <Link to="/admin/donations" className="btn btn-primary btn-sm btn-full-width">
                <CheckSquare size={16} /> {t('admin.modules.donationsBtn')}
              </Link>
            </div>
          )}

          {/* Module 3: Volunteer Management */}
          {admin?.role !== 'staff' && (
            <div className="card card-padding-md">
              <div className="admin-module-header">
                <div className="admin-icon-box">
                  <Users size={32} className="card-icon-primary" />
                </div>
                <div>
                  <h3 className="admin-module-title">{t('admin.volunteerMgmt')}</h3>
                  <span className="admin-module-badge">{t('admin.modules.volunteersBadge')}</span>
                </div>
              </div>
              <p className="admin-module-desc">
                {t('admin.modules.volunteersDesc')}
              </p>
              <Link to="/admin/volunteers" className="btn btn-primary btn-sm btn-full-width">
                <Users size={16} /> {t('admin.modules.volunteersBtn')}
              </Link>
            </div>
          )}

          {/* Module 4: About Us CMS */}
          {admin?.role !== 'staff' && (
            <div className="card card-padding-md">
              <div className="admin-module-header">
                <div className="admin-icon-box">
                  <Globe size={32} className="card-icon-primary" />
                </div>
                <div>
                  <h3 className="admin-module-title">{t('admin.aboutMgmt')}</h3>
                  <span className="admin-module-badge">{t('admin.modules.aboutBadge')}</span>
                </div>
              </div>
              <p className="admin-module-desc">
                {t('admin.modules.aboutDesc')}
              </p>
              <Link to="/admin/about" className="btn btn-primary btn-sm btn-full-width">
                <Globe size={16} /> {t('admin.modules.aboutBtn')}
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
