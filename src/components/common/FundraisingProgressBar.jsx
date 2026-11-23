// src/components/common/FundraisingProgressBar.jsx - Fundraising Goal Progress Bar

import React from 'react';
import { Target } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FundraisingProgressBar = ({ raised = 0, goal = 0 }) => {
  const { t } = useLanguage();

  if (!goal || goal <= 0) return null;

  const percentage = Math.min(100, Math.round((raised / goal) * 100));

  return (
    <div className="fundraising-progress-card margin-bottom-md">
      <div className="flex-row-between text-xs margin-bottom-xs font-bold">
        <span className="flex-row-gap-xs text-primary">
          <Target size={14} className="icon-inline-primary" />
          {t('fundraising.title')}
        </span>
        <span className="text-muted">
          {percentage}% {t('fundraising.achieved')}
        </span>
      </div>

      <progress
        className="progress-native progress-success"
        value={percentage}
        max={100}
      />

      <div className="flex-row-between margin-top-xs text-xs">
        <div>
          <small className="text-muted">{t('fundraising.raised')}:</small>
          <div className="font-bold text-primary">MYR {parseFloat(raised).toFixed(2)}</div>
        </div>
        <div className="text-right">
          <small className="text-muted">{t('fundraising.goal')}:</small>
          <div className="font-bold">MYR {parseFloat(goal).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
