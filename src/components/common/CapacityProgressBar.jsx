// src/components/common/CapacityProgressBar.jsx - Event Capacity Progress Bar

import React from 'react';
import { Users, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const CapacityProgressBar = ({ current = 0, max = 0 }) => {
  const { t } = useLanguage();

  if (!max || max <= 0) return null;

  const percentage = Math.min(100, Math.round((current / max) * 100));
  const isFull = current >= max;

  return (
    <div className="capacity-progress-container margin-bottom-md">
      <div className="flex-row-between text-xs margin-bottom-xs font-bold">
        <span className="flex-row-gap-xs">
          <Users size={14} className="icon-inline-primary" />
          {t('capacity.label')}
        </span>
        <span className={isFull ? 'text-danger' : 'text-primary'}>
          {current} / {max} {t('capacity.unit')} ({percentage}%)
        </span>
      </div>

      <progress
        className={`progress-native ${isFull ? 'progress-danger' : ''}`}
        value={percentage}
        max={100}
      />

      {isFull && (
        <div className="alert-box alert-warning text-xs margin-top-xs">
          <AlertTriangle size={14} /> {t('capacity.fullNotice')}
        </div>
      )}
    </div>
  );
};
