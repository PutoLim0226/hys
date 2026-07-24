// src/components/AddToCalendar.jsx - 1-Click Add to Google / Apple Calendar (.ics)

import React, { useState } from 'react';
import { Calendar, Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AddToCalendar = ({ title, description, location = 'Penang Hui Yin Seh Hall', startDate = '2026-08-15T09:00:00', endDate = '2026-08-15T16:00:00' }) => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description || '')}&location=${encodeURIComponent(location)}`;

  const downloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Hui Yin Seh//NONSGML Event//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description || ''}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.substring(0, 20)}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="add-to-calendar-wrapper">
      <button className="btn btn-sm btn-secondary" onClick={() => setOpen(!open)}>
        <Calendar size={14} /> {lang === 'zh-CN' ? '加入行事历 / 日历' : 'Add to Calendar'}
      </button>

      {open && (
        <div className="dropdown-menu-calendar">
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="dropdown-item">
            <ExternalLink size={14} /> Google Calendar
          </a>
          <button className="dropdown-item" onClick={downloadIcs}>
            <Download size={14} /> Apple / Outlook (.ics)
          </button>
        </div>
      )}
    </div>
  );
};
