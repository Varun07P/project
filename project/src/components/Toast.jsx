import React from 'react';
import { CheckCircle } from 'lucide-react';

const Toast = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-400" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;