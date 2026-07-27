// src/pages/admin/AdminAbout.jsx - About Us CMS Management Component

import { apiFetch } from '../../api/client';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, ArrowLeft, LogOut, Sun, Moon, Globe, BookOpen, Heart, ShieldCheck, Music, Users, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SeoHead } from '../../components/SeoHead';
import { Modal } from '../../components/common/Modal';
import { AdminHeader } from '../../components/admin/AdminHeader';

import logoImg from '../../assets/img/logo.png';

export const AdminAbout = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    section_key: '',
    title_zh: '',
    title_en: '',
    content_zh: '',
    content_en: '',
    icon_name: 'BookOpen',
    sort_order: 0
  });

  const fetchSections = () => {
    setLoading(true);
    apiFetch('/api/about.php')
      
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          setSections(res.data);
        }
      })
      .catch(() => {
        setSections([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const openAddModal = () => {
    setActiveItem(null);
    setFormData({
      id: '',
      section_key: 'section_' + Date.now(),
      title_zh: '',
      title_en: '',
      content_zh: '',
      content_en: '',
      icon_name: 'BookOpen',
      sort_order: sections.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setActiveItem(item);
    setFormData({
      id: item.id,
      section_key: item.section_key,
      title_zh: item.title_zh,
      title_en: item.title_en,
      content_zh: item.content_zh,
      content_en: item.content_en,
      icon_name: item.icon_name || 'BookOpen',
      sort_order: item.sort_order || 0
    });
    setModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setActiveItem(item);
    setDeleteModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/api/admin/about_save.php', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });
    } catch (err) {
      console.error('Error saving about section:', err);
    } finally {
      setModalOpen(false);
      fetchSections();
    }
  };

  const handleDelete = async () => {
    if (!activeItem) return;
    try {
      await apiFetch('/api/admin/about_delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ id: activeItem.id })
      });
    } catch (err) {
      console.error('Error deleting about section:', err);
    } finally {
      setDeleteModalOpen(false);
      fetchSections();
    }
  };

  const renderIcon = (name) => {
    switch (name) {
      case 'Heart': return <Heart size={18} />;
      case 'ShieldCheck': return <ShieldCheck size={18} />;
      case 'Music': return <Music size={18} />;
      case 'Users': return <Users size={18} />;
      case 'Award': return <Award size={18} />;
      case 'Globe': return <Globe size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  return (
    <div className="admin-page-wrapper flex-1">
      <SeoHead title={lang === 'zh-CN' ? '关于我们管理' : 'About Us Management'} />

      {/* Standalone Admin Header Bar */}
      <AdminHeader />

      <div className="container admin-container">
        <div className="admin-header-bar">
          <div>
            <Link to="/admin/dashboard" className="btn btn-sm btn-secondary margin-bottom-xs">
              <ArrowLeft size={14} /> {lang === 'zh-CN' ? '返回仪表板' : 'Back to Dashboard'}
            </Link>
            <h1 className="admin-page-title">{lang === 'zh-CN' ? '关于我们内容管理' : 'About Us Content Management'}</h1>
          </div>

          <button onClick={openAddModal} className="btn btn-primary">
            <Plus size={18} /> {lang === 'zh-CN' ? '新增关于我们区块' : 'Add Section'}
          </button>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>排序</th>
                <th>Key</th>
                <th>{lang === 'zh-CN' ? '图标' : 'Icon'}</th>
                <th>{lang === 'zh-CN' ? '标题 (中 / EN)' : 'Title (CN / EN)'}</th>
                <th>{lang === 'zh-CN' ? '内容预览 (中)' : 'Content (CN)'}</th>
                <th>{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {sections.map(item => (
                <tr key={item.id}>
                  <td>#{item.sort_order}</td>
                  <td><code className="text-xs">{item.section_key}</code></td>
                  <td>{renderIcon(item.icon_name)}</td>
                  <td>
                    <div className="font-bold">{item.title_zh}</div>
                    <div className="text-muted text-xs">{item.title_en}</div>
                  </td>
                  <td>
                    <div className="text-sm line-clamp-2">{item.content_zh}</div>
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
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={activeItem ? (lang === 'zh-CN' ? '编辑关于我们区块' : 'Edit Section') : (lang === 'zh-CN' ? '新增关于我们区块' : 'Add Section')}>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>{lang === 'zh-CN' ? '中文标题' : 'Title (ZH)'} *</label>
              <input
                type="text"
                required
                value={formData.title_zh}
                onChange={(e) => setFormData({ ...formData, title_zh: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>{lang === 'zh-CN' ? '英文标题' : 'Title (EN)'} *</label>
              <input
                type="text"
                required
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>{lang === 'zh-CN' ? '图示选择' : 'Icon Select'}</label>
              <select value={formData.icon_name} onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}>
                <option value="BookOpen">BookOpen (弘法/教育)</option>
                <option value="Heart">Heart (献血/慈心)</option>
                <option value="ShieldCheck">ShieldCheck (社会福利/防护)</option>
                <option value="Music">Music (合唱团/艺术)</option>
                <option value="Users">Users (组织结构/团队)</option>
                <option value="Award">Award (荣誉/历史)</option>
                <option value="Globe">Globe (国际/文化)</option>
              </select>
            </div>

            <div className="form-group">
              <label>{lang === 'zh-CN' ? '排序位置' : 'Sort Order'}</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="form-group">
              <label>{lang === 'zh-CN' ? '中文内容' : 'Content (ZH)'} *</label>
              <textarea
                required
                rows={4}
                value={formData.content_zh}
                onChange={(e) => setFormData({ ...formData, content_zh: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group">
              <label>{lang === 'zh-CN' ? '英文内容' : 'Content (EN)'} *</label>
              <textarea
                required
                rows={4}
                value={formData.content_en}
                onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
              ></textarea>
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
