// src/pages/admin/AdminNews.jsx - News CMS Management

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { SeoHead } from '../../components/SeoHead';
import { Modal } from '../../components/Modal';

export const AdminNews = () => {
  const { t } = useLanguage();
  const { getAuthHeaders } = useAuth();

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
    status: 'published'
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

  const openAddModal = () => {
    setActiveItem(null);
    setFormData({
      id: '',
      title_zh: '',
      title_en: '',
      content_zh: '',
      content_en: '',
      category: 'general',
      status: 'published'
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
      status: item.status
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
    <div className="container" style={{ padding: '3rem 1.25rem', flex: 1 }}>
      <SeoHead title={t('admin.newsCms')} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Link to="/admin/dashboard" className="btn btn-sm btn-secondary" style={{ marginBottom: '0.5rem' }}>
            <ArrowLeft size={14} /> 回儀表板
          </Link>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{t('admin.newsCms')}</h1>
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
              <th>封面圖</th>
              <th>標題 (中 / EN)</th>
              <th>{t('admin.category')}</th>
              <th>{t('admin.status')}</th>
              <th>發布時間</th>
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
                    style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{item.title_zh}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.title_en}</div>
                </td>
                <td><span className="badge badge-pending">{t(`news.${item.category}`) || item.category}</span></td>
                <td>
                  <span className={`badge ${item.status === 'published' ? 'badge-confirmed' : 'badge-rejected'}`}>
                    {item.status === 'published' ? t('admin.published') : t('admin.draft')}
                  </span>
                </td>
                <td style={{ fontSize: '0.85rem' }}>{item.created_at ? item.created_at.substring(0, 10) : ''}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
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

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
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
        <p style={{ marginBottom: '1.5rem' }}>{t('admin.deleteConfirm')}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={() => setDeleteModalOpen(false)}>
            {t('admin.cancel')}
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            {t('admin.delete')}
          </button>
        </div>
      </Modal>
    </div>
  );
};
