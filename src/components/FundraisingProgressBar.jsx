// src/components/FundraisingProgressBar.jsx - Fundraising Goal Progress Bar

import React from 'react';
import { DollarSign, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FundraisingProgressBar = ({ raised = 0, goal = 0 }) => {
  const { lang } = useLanguage();

  if (!goal || goal <= 0) return null;

  const percentage = Math.min(100, Math.round((raised / goal) * 100));

  return (
    <div className="fundraising-progress-card margin-bottom-md">
      <div className="flex-row-between text-xs margin-bottom-xs font-bold">
        <span className="flex-row-gap-xs text-primary">
          <Target size={14} className="icon-inline-primary" />
          {lang === 'zh-CN' ? '专案筹款进度' : 'Fundraising Goal Progress'}
        </span>
        <span className="text-muted">
          {percentage}% {lang === 'zh-CN' ? '已达成' : 'Achieved'}
        </span>
      </div>

      <div className="progress-bar-track">
        <div
          className="progress-bar-fill bg-success"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="flex-row-between margin-top-xs text-xs">
        <div>
          <small className="text-muted">{lang === 'zh-CN' ? '已筹得金额' : 'Raised Amount'}:</small>
          <div className="font-bold text-primary">MYR {parseFloat(raised).toFixed(2)}</div>
        </div>
        <div className="text-right">
          <small className="text-muted">{lang === 'zh-CN' ? '目标金额' : 'Target Goal'}:</small>
          <div className="font-bold">MYR {parseFloat(goal).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
