import React from 'react';
import { DollarSign, Clock, Users, Newspaper } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AdminKpiCards = ({ stats }) => {
  const { t } = useLanguage();
  const recUnit = t('admin.unit.records');
  const pplUnit = t('admin.unit.people');
  const postUnit = t('admin.unit.posts');

  return (
    <div className="grid-layout margin-bottom-lg">

      {/* KPI 1: Donations */}
      <div className="card card-padding-md stat-card-analytics">
        <div className="stat-icon-wrapper">
          <DollarSign size={28} className="card-icon-primary" />
        </div>
        <div className="stat-info">
          <span className="stat-label">{t('admin.kpi.confirmedDonations')}</span>
          <h3 className="stat-value">MYR {parseFloat(stats.donations?.total_amount || 0).toFixed(2)}</h3>
          <div className="stat-badge-row">
            <span className="badge badge-pending">
              <Clock size={12} /> {t('admin.pending')}: {stats.donations?.pending_count || 0}{recUnit ? ` ${recUnit}` : ''}
            </span>
            <span className="badge badge-confirmed">
              {t('admin.confirmed')}: {stats.donations?.confirmed_count || 0}{recUnit ? ` ${recUnit}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* KPI 2: Volunteers */}
      <div className="card card-padding-md stat-card-analytics">
        <div className="stat-icon-wrapper">
          <Users size={28} className="card-icon-primary" />
        </div>
        <div className="stat-info">
          <span className="stat-label">{t('admin.kpi.totalVolunteers')}</span>
          <h3 className="stat-value">{stats.volunteers?.total_count || 0}{pplUnit ? ` ${pplUnit}` : ''}</h3>
          <div className="stat-badge-row">
            <span className="badge badge-pending">
              {t('admin.pending')}: {stats.volunteers?.pending_count || 0}{pplUnit ? ` ${pplUnit}` : ''}
            </span>
            <span className="badge badge-approved">
              {t('admin.approved')}: {stats.volunteers?.approved_count || 0}{pplUnit ? ` ${pplUnit}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* KPI 3: News / Events */}
      <div className="card card-padding-md stat-card-analytics">
        <div className="stat-icon-wrapper">
          <Newspaper size={28} className="card-icon-primary" />
        </div>
        <div className="stat-info">
          <span className="stat-label">{t('admin.kpi.publishedNews')}</span>
          <h3 className="stat-value">{stats.news?.published_count || 0}{postUnit ? ` ${postUnit}` : ''}</h3>
          <div className="stat-badge-row">
            <span className="badge badge-pending">
              {t('admin.draft')}: {stats.news?.draft_count || 0}{postUnit ? ` ${postUnit}` : ''}
            </span>
            <span className="badge badge-approved">
              {t('admin.kpi.totalRecords')}: {stats.news?.total_count || 0}{postUnit ? ` ${postUnit}` : ''}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
