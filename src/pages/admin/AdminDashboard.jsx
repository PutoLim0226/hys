// src/pages/admin/AdminDashboard.jsx - Admin Overview, Analytics & CMS Hub

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
    fetch('/api/admin/dashboard_stats.php', {
      headers: getAuthHeaders()
    })
      .then(res => {
        if (res.status === 401) {
          logout();
          navigate('/admin/login');
          return null;
        }
        return res.json();
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
              {lang === 'zh-CN' ? '欢迎回来，管理员' : 'Welcome back, Admin'} <strong>{admin?.username || 'Admin'}</strong>
            </p>
          </div>
        </div>

        {/* Analytics & KPI Summary Cards */}
        <AdminKpiCards stats={stats} lang={lang} />

        {/* Volunteer Count per Event / Activity Breakdown */}
        <div className="card card-padding-md margin-bottom-lg">
          <div className="admin-header-bar margin-bottom-md">
            <div>
              <h2 className="card-heading-section margin-bottom-xs">
                <Award size={20} className="icon-inline-primary" />
                {lang === 'zh-CN' ? '各活动 / 专案志愿者统计人数' : 'Volunteers Count Per Event Breakdown'}
              </h2>
              <p className="text-muted text-sm">
                {lang === 'zh-CN' ? '实时统计绑定至各个具体献血运动、合唱团音乐会与公益项目的报名人数' : 'Real-time volunteer registration counts grouped by specific published event'}
              </p>
            </div>
            <Link to="/admin/volunteers" className="btn btn-secondary btn-sm">
              <Users size={16} /> {lang === 'zh-CN' ? '管理完整名单' : 'Manage All Volunteers'}
            </Link>
          </div>

          <div className="table-responsive">
            <table className="admin-table margin-bottom-md">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{lang === 'zh-CN' ? '活动 / 专案名称' : 'Event / Activity Name'}</th>
                  <th>{t('admin.category')}</th>
                  <th>{lang === 'zh-CN' ? '已报名志工人数' : 'Registered Volunteers'}</th>
                </tr>
              </thead>
              <tbody>
                {(stats.volunteers?.event_breakdown || []).map(ev => (
                  <tr key={ev.event_id}>
                    <td>#{ev.event_id}</td>
                    <td className="font-bold">{lang === 'zh-CN' ? ev.title_zh : ev.title_en}</td>
                    <td><span className="badge badge-pending">{t(`news.${ev.category}`) || ev.category}</span></td>
                    <td className="font-bold text-primary">{ev.count} 人</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="card-heading-section margin-top-md margin-bottom-xs">
            <Users size={16} className="icon-inline-primary" />
            {lang === 'zh-CN' ? '最新志愿服务报名明细' : 'Recent Volunteer Applications'}
          </h3>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{lang === 'zh-CN' ? '姓名' : 'Name'}</th>
                  <th>{lang === 'zh-CN' ? '联系电话' : 'Phone'}</th>
                  <th>{lang === 'zh-CN' ? '对应活动项目' : 'Target Event'}</th>
                  <th>{lang === 'zh-CN' ? '专长技能' : 'Skills'}</th>
                  <th>{t('admin.status')}</th>
                </tr>
              </thead>
              <tbody>
                {(stats.volunteers?.list || []).map(v => (
                  <tr key={v.id}>
                    <td>#{v.id}</td>
                    <td className="font-bold">{v.name}</td>
                    <td>{v.phone}</td>
                    <td><span className="activity-skill-tag">{lang === 'zh-CN' ? (v.event_title_zh || '通用支援') : (v.event_title_en || 'General Support')}</span></td>
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
          {lang === 'zh-CN' ? '后台管理模组入口' : 'Management Modules'}
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
                <span className="admin-module-badge">{lang === 'zh-CN' ? '最新消息与活动图文管理' : 'News & Events Management'}</span>
              </div>
            </div>
            <p className="admin-module-desc">
              {lang === 'zh-CN' ? '发布、修改或删除慧音社各项公益活动、献血新闻与合唱团动态。' : 'Publish, edit, or delete news and event updates.'}
            </p>
            <Link to="/admin/news" className="btn btn-primary btn-sm btn-full-width">
              <PlusCircle size={16} /> {lang === 'zh-CN' ? '管理最新消息' : 'Manage News'}
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
                  <span className="admin-module-badge">{lang === 'zh-CN' ? '转账截图与善款对账' : 'Donation Receipt Verification'}</span>
                </div>
              </div>
              <p className="admin-module-desc">
                {lang === 'zh-CN' ? '查看信众上传的 TNG / DuitNow 转账截图，人工核对并进行对账确认。' : 'Review e-wallet transfer screenshots and audit donations.'}
              </p>
              <Link to="/admin/donations" className="btn btn-primary btn-sm btn-full-width">
                <CheckSquare size={16} /> {lang === 'zh-CN' ? '管理捐款记录' : 'Manage Donations'}
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
                  <span className="admin-module-badge">{lang === 'zh-CN' ? '志愿者报名名单与审核' : 'Volunteer Applications Audit'}</span>
                </div>
              </div>
              <p className="admin-module-desc">
                {lang === 'zh-CN' ? '检视大众线上报名之志愿者资料库，进行审核与联系状态更新。' : 'View volunteer registrations and update approval status.'}
              </p>
              <Link to="/admin/volunteers" className="btn btn-primary btn-sm btn-full-width">
                <Users size={16} /> {lang === 'zh-CN' ? '管理志愿者名单' : 'Manage Volunteers'}
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
                  <h3 className="admin-module-title">{lang === 'zh-CN' ? '关于我们内容管理' : 'About Us Management'}</h3>
                  <span className="admin-module-badge">{lang === 'zh-CN' ? '本社简史与四大宗旨编辑' : 'History & Mission CMS'}</span>
                </div>
              </div>
              <p className="admin-module-desc">
                {lang === 'zh-CN' ? '实时修改与维护「关于我们」页面中的本社简史、四大宗旨与组织架构介绍。' : 'Edit and manage history, mission, and organization content on the About Us page.'}
              </p>
              <Link to="/admin/about" className="btn btn-primary btn-sm btn-full-width">
                <Globe size={16} /> {lang === 'zh-CN' ? '管理关于我们' : 'Manage About Us'}
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
