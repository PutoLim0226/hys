import React from 'react';
import { Calendar, Users, Target } from 'lucide-react';

export const AdminNewsForm = ({ formData, setFormData, setCoverFile, handleSave, setModalOpen, lang, t, activeItem }) => {
  return (
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
  );
};
