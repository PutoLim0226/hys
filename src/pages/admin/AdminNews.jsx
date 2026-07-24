// src/pages/admin/AdminNews.jsx - News CMS Management with Event Date & Capacity

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, ArrowLeft, LogOut, Sun, Moon, Globe, Calendar, Users, Target } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SeoHead } from '../../components/SeoHead';
import { Modal } from '../../components/Modal';

import logoImg from '../../assets/img/logo.png';

export const AdminNews = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title_zh: '',
    title_en: '',
    content_zh: '',
    content_en: '',
    category: 'general',
    status: 'published',
    event_date: '',
    max_capacity: 0,
    fundraising_goal: 0,
    fundraising_raised: 0
  });
  const [coverFile, setCoverFile] = useState(null);

  const fetchNews = () => {
    setLoading(true);
    fetch('/api/news.php?status=all')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          setNews(res.data);
        }
      })
      .catch(() => {
        setNews([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const openAddModal = () => {
    setActiveItem(null);
    setFormData({
      id: '',
      title_zh: '',
      title_en: '',
      content_zh: '',
      content_en: '',
      category: 'general',
      status: 'published',
      event_date: '',
      max_capacity: 0,
      fundraising_goal: 0,
      fundraising_raised: 0
    });
    setCoverFile(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setActiveItem(item);
    setFormData({
      id: item.id,
      title_zh: item.title_zh,
      title_en: item.title_en,
      content_zh: item.content_zh,
      content_en: item.content_en,
      category: item.category,
      status: item.status,
      event_date: item.event_date || '',
      max_capacity: item.max_capacity || 0,
      fundraising_goal: item.fundraising_goal || 0,
      fundraising_raised: item.fundraising_raised || 0
    });
    setCoverFile(null);
    setModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setActiveItem(item);
    setDeleteModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (formData.id) data.append('id', formData.id);
    data.append('title_zh', formData.title_zh);
    data.append('title_en', formData.title_en);
    data.append('content_zh', formData.content_zh);
    data.append('content_en', formData.content_en);
    data.append('category', formData.category);
    data.append('status', formData.status);
    if (formData.event_date) data.append('event_date', formData.event_date);
    data.append('max_capacity', formData.max_capacity);
    data.append('fundraising_goal', formData.fundraising_goal);
    data.append('fundraising_raised', formData.fundraising_raised);

    if (coverFile) {
      data.append('cover_image', coverFile);
    }

    try {
      const res = await fetch('/api/admin/news_save.php', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: data
      });
      await res.json();
    } catch (err) {
      console.error('Error saving news:', err);
    } finally {
      setModalOpen(false);
      fetchNews();
    }
  };

  const handleDelete = async () => {
    if (!activeItem) return;
    try {
      await fetch('/api/admin/news_delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ id: activeItem.id })
      });
    } catch (err) {
      console.error('Error deleting news:', err);
    } finally {
      setDeleteModalOpen(false);
      fetchNews();
    }
  };

  return (
    <div className="admin-page-wrapper flex-1">
      <SeoHead title={t('admin.newsCms')} />

      {/* Standalone Admin Header Bar */}
      <header className="admin-standalone-header">
        <div className="container flex-row-between">
          <div className="flex-row-gap-md">
            <img src={logoImg} alt="Logo" className="brand-logo-img-sm" />
            <div>
              <span className="admin-portal-brand">{t('brandName')}</span>
              <small className="admin-portal-sub">{lang === 'zh-CN' ? '管理后台' : 'Admin Portal'}</small>
            </div>
          </div>

          <div className="flex-row-gap-sm">
            <button className="lang-btn" onClick={toggleLanguage} aria-label="Toggle language">
              <Globe size={14} className="inline-icon" /> {lang === 'zh-CN' ? 'EN' : '中文'}
            </button>
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              <LogOut size={16} /> {t('admin.logout')}
            </button>
          </div>
        </div>
      </header>

      <div className="container admin-container">
        <div className="admin-header-bar">
          <div>
            <Link to="/admin/dashboard" className="btn btn-sm btn-secondary margin-bottom-xs">
              <ArrowLeft size={14} /> {lang === 'zh-CN' ? '返回仪表板' : 'Back to Dashboard'}
            </Link>
            <h1 className="admin-page-title">{t('admin.newsCms')}</h1>
          </div>

          <button onClick={openAddModal} className="btn btn-primary">
            <Plus size={18} /> {t('admin.addNews')}
          </button>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{lang === 'zh-CN' ? '封面图' : 'Cover'}</th>
                <th>{lang === 'zh-CN' ? '标题 (中 / EN)' : 'Title (CN / EN)'}</th>
                <th>{lang === 'zh-CN' ? '活动/预告日期' : 'Event Date'}</th>
                <th>{t('admin.category')}</th>
                <th>{t('admin.status')}</th>
                <th>{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {news.map(item => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>
                    <img
                      src={item.cover_image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=800&q=80'}
                      alt="cover"
                      className="table-thumb"
                    />
                  </td>
                  <td>
                    <div className="font-bold">{item.title_zh}</div>
                    <div className="text-muted text-xs">{item.title_en}</div>
                  </td>
                  <td>
                    {item.event_date ? (
                      <span className="badge badge-confirmed">
                        <Calendar size={12} /> {item.event_date}
                      </span>
                    ) : (
                      <span className="text-muted text-xs">{lang === 'zh-CN' ? '无特定日期' : 'No Event Date'}</span>
                    )}
                  </td>
                  <td><span className="badge badge-pending">{t(`news.${item.category}`) || item.category}</span></td>
                  <td>
                    <span className={`badge ${item.status === 'published' ? 'badge-confirmed' : 'badge-rejected'}`}>
                      {item.status === 'published' ? t('admin.published') : t('admin.draft')}
                    </span>
                  </td>
                  <td>
                    <div className="flex-row-gap-xs">
                      <button onClick={() => openEditModal(item)} className="btn btn-sm btn-secondary" aria-label="Edit">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => openDeleteModal(item)} className="btn btn-sm btn-danger" aria-label="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add / Edit Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={activeItem ? t('admin.editNews') : t('admin.addNews')}>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>{t('admin.titleZh')} *</label>
              <input
                type="text"
                required
                value={formData.title_zh}
                onChange={(e) => setFormData({ ...formData, title_zh: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>{t('admin.titleEn')} *</label>
              <input
                type="text"
                required
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>
                <Calendar size={14} className="inline-icon" /> {lang === 'zh-CN' ? '活动/预告日期 (Event Date)' : 'Event Date'}
              </label>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
              />
              <small className="form-hint">{lang === 'zh-CN' ? '设定预告日期，前台将明确标示活动举办日期与预告标签' : 'Set target event date for upcoming announcements'}</small>
            </div>

            <div className="form-group">
              <label>
                <Users size={14} className="inline-icon" /> {lang === 'zh-CN' ? '志工/参与名额上限 (Max Capacity)' : 'Max Capacity'}
              </label>
              <input
                type="number"
                min="0"
                value={formData.max_capacity}
                onChange={(e) => setFormData({ ...formData, max_capacity: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="form-group">
              <label>
                <Target size={14} className="inline-icon" /> {lang === 'zh-CN' ? '筹款目标金额 MYR (Fundraising Goal)' : 'Fundraising Goal MYR'}
              </label>
              <input
                type="number"
                min="0"
                step="100"
                value={formData.fundraising_goal}
                onChange={(e) => setFormData({ ...formData, fundraising_goal: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="form-group">
              <label>{t('admin.category')}</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="general">{t('news.general')}</option>
                <option value="donation_drive">{t('news.donation_drive')}</option>
                <option value="choir">{t('news.choir')}</option>
                <option value="charity">{t('news.charity')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('admin.status')}</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="published">{t('admin.published')}</option>
                <option value="draft">{t('admin.draft')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('admin.contentZh')} *</label>
              <textarea
                required
                value={formData.content_zh}
                onChange={(e) => setFormData({ ...formData, content_zh: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group">
              <label>{t('admin.contentEn')} *</label>
              <textarea
                required
                value={formData.content_en}
                onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group">
              <label>{t('admin.coverImage')}</label>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setCoverFile(e.target.files[0])} />
            </div>

            <div className="modal-actions-bar">
              <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                {t('admin.cancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('admin.save')}
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title={t('admin.delete')}>
          <p className="margin-bottom-md">{t('admin.deleteConfirm')}</p>
          <div className="modal-actions-bar">
            <button className="btn btn-secondary" onClick={() => setDeleteModalOpen(false)}>
              {t('admin.cancel')}
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              {t('admin.delete')}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
