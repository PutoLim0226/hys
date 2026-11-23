// src/components/SocialShareButtons.jsx - 1-Click Social Share Buttons for FB, WhatsApp & Telegram

import React from 'react';
import { Share2, Send, MessageSquare, Facebook } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SocialShareButtons = ({ title = '', url = window.location.href }) => {
  const { t } = useLanguage();
  const shareText = encodeURIComponent(`${title}\n${url}`);

  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const waShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;
  const tgShareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="social-share-bar margin-top-md">
      <span className="share-label text-xs text-muted font-bold flex-row-gap-xs">
        <Share2 size={14} /> {t('share.label')}
      </span>
      <div className="share-buttons-group">
        <a href={fbShareUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-facebook" aria-label="Share on Facebook">
          <Facebook size={14} /> Facebook
        </a>
        <a href={waShareUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-whatsapp" aria-label="Share on WhatsApp">
          <MessageSquare size={14} /> WhatsApp
        </a>
        <a href={tgShareUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-telegram" aria-label="Share on Telegram">
          <Send size={14} /> Telegram
        </a>
      </div>
    </div>
  );
};
