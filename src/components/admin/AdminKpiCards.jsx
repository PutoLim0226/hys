import React from 'react';
import { DollarSign, Clock, Users, Newspaper } from 'lucide-react';

export const AdminKpiCards = ({ stats, lang }) => {
  return (
    <div className="grid-layout margin-bottom-lg">
      
      {/* KPI 1: Donations */}
      <div className="card card-padding-md stat-card-analytics">
        <div className="stat-icon-wrapper">
          <DollarSign size={28} className="card-icon-primary" />
        </div>
        <div className="stat-info">
          <span className="stat-label">{lang === 'zh-CN' ? '累计对账善款金额' : 'Confirmed Donations'}</span>
          <h3 className="stat-value">MYR {parseFloat(stats.donations?.total_amount || 0).toFixed(2)}</h3>
          <div className="stat-badge-row">
            <span className="badge badge-pending">
              <Clock size={12} /> {lang === 'zh-CN' ? '待对账' : 'Pending'}: {stats.donations?.pending_count || 0} 笔
            </span>
            <span className="badge badge-confirmed">
              {lang === 'zh-CN' ? '已确认' : 'Confirmed'}: {stats.donations?.confirmed_count || 0} 笔
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
          <span className="stat-label">{lang === 'zh-CN' ? '志愿者注册总人数' : 'Total Volunteers'}</span>
          <h3 className="stat-value">{stats.volunteers?.total_count || 0} 人</h3>
          <div className="stat-badge-row">
            <span className="badge badge-pending">
              {lang === 'zh-CN' ? '待审核' : 'Pending'}: {stats.volunteers?.pending_count || 0} 人
            </span>
            <span className="badge badge-approved">
              {lang === 'zh-CN' ? '已审核通过' : 'Approved'}: {stats.volunteers?.approved_count || 0} 人
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
          <span className="stat-label">{lang === 'zh-CN' ? '最新消息与活动发布数' : 'Total Published News'}</span>
          <h3 className="stat-value">{stats.news?.published_count || 0} 篇</h3>
          <div className="stat-badge-row">
            <span className="badge badge-pending">
              {lang === 'zh-CN' ? '草稿' : 'Drafts'}: {stats.news?.draft_count || 0} 篇
            </span>
            <span className="badge badge-approved">
              {lang === 'zh-CN' ? '总记录' : 'Total'}: {stats.news?.total_count || 0} 篇
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
