// src/pages/admin/AdminVolunteers.jsx - Volunteer Audit & Management

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Archive, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { SeoHead } from '../../components/SeoHead';
import { Modal } from '../../components/Modal';

export const AdminVolunteers = () => {
  const { t } = useLanguage();
  const { getAuthHeaders } = useAuth();

  const [volunteers, setVolunteers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const fetchVolunteers = () => {
    fetch(`/api/admin/volunteers.php?status=${filterStatus}`, {
      headers: getAuthHeaders()
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          setVolunteers(res.data);
        }
      })
      .catch(() => {
        setVolunteers([
          {
            id: 1,
            name: '林志豪 (Lim Chee How)',
            phone: '+6017-4567890',
            email: 'cheehow@example.com',
            skills: '獻血運動現場登記、活動主持',
            availability: '每個週末、專案緊急支援',
            status: 'pending',
            created_at: '2026-07-22 09:00:00'
          },
          {
            id: 2,
            name: '陳雅婷 (Tan Ya Ting)',
            phone: '+6012-3334444',
            email: 'yating@example.com',
            skills: '合唱團伴奏、文宣設計',
            availability: '週五晚間、週六下午',
            status: 'approved',
            created_at: '2026-07-15 16:20:00'
          }
        ]);
      });
  };

  useEffect(() => {
    fetchVolunteers();
  }, [filterStatus]);

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch('/api/admin/volunteer_update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (err) {
      // Mock
    } finally {
      fetchVolunteers();
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.25rem', flex: 1 }}>
      <SeoHead title={t('admin.volunteerMgmt')} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Link to="/admin/dashboard" className="btn btn-sm btn-secondary" style={{ marginBottom: '0.5rem' }}>
            <ArrowLeft size={14} /> 回儀表板
          </Link>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{t('admin.volunteerMgmt')}</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'pending', 'approved', 'archived'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
            >
              {st === 'all' ? '全部' : t(`admin.${st}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>聯絡電話</th>
              <th>電子郵件</th>
              <th>專長 / 技能</th>
              <th>{t('admin.status')}</th>
              <th>報名時間</th>
              <th>{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map(item => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td style={{ fontWeight: 600 }}>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td style={{ maxWidth: '200px' }}>{item.skills}</td>
                <td>
                  <span className={`badge badge-${item.status}`}>
                    {t(`admin.${item.status}`)}
                  </span>
                </td>
                <td style={{ fontSize: '0.85rem' }}>{item.created_at}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setSelectedVolunteer(item)}
                      title="檢視詳情"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => updateStatus(item.id, 'approved')}
                      className="btn btn-sm btn-success"
                      title="審核通過"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => updateStatus(item.id, 'archived')}
                      className="btn btn-sm btn-danger"
                      title="存檔"
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
      <Modal isOpen={!!selectedVolunteer} onClose={() => setSelectedVolunteer(null)} title="志工詳細報名資料">
        {selectedVolunteer && (
          <div style={{ fontSize: '1rem', lineHeight: 1.8 }}>
            <p><strong>姓名：</strong> {selectedVolunteer.name}</p>
            <p><strong>電話：</strong> {selectedVolunteer.phone}</p>
            <p><strong>Email：</strong> {selectedVolunteer.email}</p>
            <p><strong>專長技能：</strong> {selectedVolunteer.skills}</p>
            <p><strong>可配合時間：</strong> {selectedVolunteer.availability}</p>
            <p><strong>報名狀態：</strong> <span className={`badge badge-${selectedVolunteer.status}`}>{t(`admin.${selectedVolunteer.status}`)}</span></p>
          </div>
        )}
      </Modal>
    </div>
  );
};
