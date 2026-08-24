// src/components/CapacityProgressBar.jsx - Event Capacity Progress Bar

import React from 'react';
import { Users, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CapacityProgressBar = ({ current = 0, max = 0 }) => {
  const { lang } = useLanguage();

  if (!max || max <= 0) return null;

  const percentage = Math.min(100, Math.round((current / max) * 100));
  const isFull = current >= max;

  return (
    <div className="capacity-progress-container margin-bottom-md">
      <div className="flex-row-between text-xs margin-bottom-xs font-bold">
        <span className="flex-row-gap-xs">
          <Users size={14} className="icon-inline-primary" />
          {lang === 'zh-CN' ? '活动志工 / 参与名额' : 'Event Volunteer Capacity'}
        </span>
        <span className={isFull ? 'text-danger' : 'text-primary'}>
          {current} / {max} {lang === 'zh-CN' ? '人' : 'Seats'} ({percentage}%)
        </span>
      </div>

      <div className="progress-bar-track">
        <div
          className={`progress-bar-fill ${isFull ? 'bg-danger' : 'bg-primary'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {isFull && (
        <div className="alert-box alert-warning text-xs margin-top-xs">
          <AlertTriangle size={14} /> {lang === 'zh-CN' ? '此活動志工名額已滿，將自動排入候補名單 (Event Capacity Full, switching to Waitlist)' : 'Event Capacity Full, switching to Waitlist'}
        </div>
      )}
    </div>
  );
};
