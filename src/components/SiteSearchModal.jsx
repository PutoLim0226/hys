// src/components/SiteSearchModal.jsx - Bilingual Site-wide Search Modal

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Modal } from './Modal';

export const SiteSearchModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/search.php?q=${encodeURIComponent(query)}`);
      const json = await res.json();
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
    <Modal isOpen={isOpen} onClose={onClose} title={lang === 'zh-CN' ? '全站双语关键字搜索' : 'Site-wide Search'}>
      <form onSubmit={handleSearch} className="search-form-modal">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-inside" />
          <input
            type="text"
            className="search-input-field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'zh-CN' ? '输入关键字搜索消息、献血活动、合唱团...' : 'Search news, blood drive, choir...'}
            autoFocus
          />
          {query && (
            <button type="button" className="icon-btn-clear" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
        <button type="submit" className="btn btn-primary margin-top-sm btn-full-width" disabled={loading}>
          {loading ? (lang === 'zh-CN' ? '搜索中...' : 'Searching...') : (lang === 'zh-CN' ? '开始搜索' : 'Search')}
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
                <span className="badge badge-pending text-xs">{item.category}</span>
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
              {lang === 'zh-CN' ? '未找到相关结果，请尝试其他关键字' : 'No matching results found.'}
            </div>
          )
        )}
      </div>
    </Modal>
  );
};
