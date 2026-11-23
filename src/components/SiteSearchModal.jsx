// src/components/SiteSearchModal.jsx - Bilingual Site-wide Search Modal

import { apiFetch } from '../api/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Modal } from './common/Modal';

export const SiteSearchModal = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await apiFetch(`/api/search.php?q=${encodeURIComponent(query)}`);
      const json = res;
      if (json.status === 'success' && Array.isArray(json.data)) {
        setResults(json.data);
      } else {
        setResults([]);
      }
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('search.modalTitle')}>
      <form onSubmit={handleSearch} className="search-form-modal">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-inside" />
          <input
            type="text"
            className="search-input-field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            autoFocus
          />
          {query && (
            <button type="button" className="icon-btn-clear" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
        <button type="submit" className="btn btn-primary margin-top-sm btn-full-width" disabled={loading}>
          {loading ? t('search.searching') : t('search.submitBtn')}
        </button>
      </form>

      <div className="search-results-list margin-top-md">
        {results.length > 0 ? (
          results.map(item => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              onClick={onClose}
              className="search-result-card"
            >
              <div className="search-result-info">
                <span className="badge badge-pending text-xs">{t(`news.${item.category}`)}</span>
                <h4 className="search-result-title">{lang === 'zh-CN' ? item.title_zh : item.title_en}</h4>
                <p className="search-result-desc text-xs text-muted">
                  {(lang === 'zh-CN' ? item.content_zh : item.content_en).substring(0, 90)}...
                </p>
              </div>
              <ArrowRight size={16} className="text-primary" />
            </Link>
          ))
        ) : (
          query && !loading && (
            <div className="text-center text-muted card-padding-md">
              {t('search.noResults')}
            </div>
          )
        )}
      </div>
    </Modal>
  );
};
