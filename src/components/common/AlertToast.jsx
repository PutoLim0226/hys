import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import '../../assets/scss/main.scss';

export const AlertToast = ({ type = 'info', message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="toast-icon success" />;
      case 'warning': return <AlertTriangle size={20} className="toast-icon warning" />;
      case 'error': return <AlertTriangle size={20} className="toast-icon error" />;
      default: return <Info size={20} className="toast-icon info" />;
    }
  };

  return (
    <div className={`alert-toast toast-${type}`}>
      {getIcon()}
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={() => {
        setVisible(false);
        if (onClose) onClose();
      }}>
        <X size={16} />
      </button>
    </div>
  );
};
