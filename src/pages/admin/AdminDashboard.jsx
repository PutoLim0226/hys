// src/pages/admin/AdminDashboard.jsx - Admin Overview & CMS Hub

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Newspaper, HeartHandshake, Users, LogOut, PlusCircle, CheckSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { SeoHead } from '../../components/SeoHead';

export const AdminDashboard = () => {
  const { t } = useLanguage();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="container" style={{ padding: '3rem 1.25rem', flex: 1 }}>
      <SeoHead title={t('admin.dashboard')} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t('admin.dashboard')}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            歡迎回來，管理者 <strong>{admin?.username || 'Admin'}</strong>
          </p>
        </div>

        <button onClick={handleLogout} className="btn btn-secondary btn-sm">
          <LogOut size={16} /> {t('admin.logout')}
        </button>
      </div>

      {/* Quick Access Modules */}
      <div className="grid-layout" style={{ marginBottom: '3rem' }}>
        
        {/* Module 1: News CMS */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <Newspaper size={32} color="var(--primary-color)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{t('admin.newsCms')}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>最新消息與活動圖文管理</span>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            發布、修改或刪除慧音社各項公益活動、獻血新聞與合唱團動態。
          </p>
          <Link to="/admin/news" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
            <PlusCircle size={16} /> 管理最新消息
          </Link>
        </div>

        {/* Module 2: Donation Audit */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <HeartHandshake size={32} color="var(--primary-color)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{t('admin.donationMgmt')}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>轉帳截圖與善款對帳</span>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            查看信眾上傳的 TNG / DuitNow 轉帳截圖，人工核對並進行對帳確認。
          </p>
          <Link to="/admin/donations" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
            <CheckSquare size={16} /> 管理捐款記錄
          </Link>
        </div>

        {/* Module 3: Volunteer Management */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <Users size={32} color="var(--primary-color)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{t('admin.volunteerMgmt')}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>志工報名名單與審核</span>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            檢視大眾線上報名之志工資料庫，進行審核與聯繫狀態更新。
          </p>
          <Link to="/admin/volunteers" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
            <Users size={16} /> 管理志工名單
          </Link>
        </div>

      </div>
    </div>
  );
};
