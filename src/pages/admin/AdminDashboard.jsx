// src/pages/admin/AdminDashboard.jsx - Admin Overview & CMS Hub

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Newspaper, HeartHandshake, Users, LogOut, PlusCircle, CheckSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { SeoHead } from '../../components/SeoHead';

export const AdminDashboard = () => {
  const { lang, t } = useLanguage();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="container admin-container flex-1">
      <SeoHead title={t('admin.dashboard')} />

      <div className="admin-header-bar">
        <div>
          <h1 className="admin-page-title">
            {t('admin.dashboard')}
          </h1>
          <p className="admin-page-subtitle">
            {lang === 'zh-CN' ? '欢迎回来，管理员' : 'Welcome back, Admin'} <strong>{admin?.username || 'Admin'}</strong>
          </p>
        </div>

        <button onClick={handleLogout} className="btn btn-secondary btn-sm">
          <LogOut size={16} /> {t('admin.logout')}
        </button>
      </div>

      {/* Quick Access Modules */}
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

        {/* Module 3: Volunteer Management */}
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

      </div>
    </div>
  );
};
