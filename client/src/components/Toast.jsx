import React, { useState, useEffect, createContext, useContext } from 'react';
import { HiX, HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiExclamation } from 'react-icons/hi';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const getToastStyles = (type) => {
    const baseStyles = "flex items-center w-full max-w-sm p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-soft dark:text-gray-400 dark:bg-gray-800 border border-gray-200 dark:border-gray-700";
    
    switch (type) {
      case 'success':
        return `${baseStyles} border-l-4 border-l-success-500`;
      case 'error':
        return `${baseStyles} border-l-4 border-l-danger-500`;
      case 'warning':
        return `${baseStyles} border-l-4 border-l-warning-500`;
      case 'info':
        return `${baseStyles} border-l-4 border-l-primary-500`;
      default:
        return baseStyles;
    }
  };

  const getIcon = (type) => {
    const iconClass = "w-5 h-5 mr-3";
    
    switch (type) {
      case 'success':
        return <HiCheckCircle className={`${iconClass} text-success-500`} />;
      case 'error':
        return <HiExclamationCircle className={`${iconClass} text-danger-500`} />;
      case 'warning':
        return <HiExclamation className={`${iconClass} text-warning-500`} />;
      case 'info':
        return <HiInformationCircle className={`${iconClass} text-primary-500`} />;
      default:
        return <HiInformationCircle className={`${iconClass} text-gray-500`} />;
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className={getToastStyles(toast.type)}>
        {getIcon(toast.type)}
        <div className="flex-1">
          {toast.title && (
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {toast.title}
            </div>
          )}
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {toast.message}
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onRemove(toast.id), 300);
          }}
          className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
        >
          <HiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, title = '', duration = 5000) => {
    addToast({ type: 'success', message, title, duration });
  };

  const showError = (message, title = '', duration = 5000) => {
    addToast({ type: 'error', message, title, duration });
  };

  const showWarning = (message, title = '', duration = 5000) => {
    addToast({ type: 'warning', message, title, duration });
  };

  const showInfo = (message, title = '', duration = 5000) => {
    addToast({ type: 'info', message, title, duration });
  };

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}; 