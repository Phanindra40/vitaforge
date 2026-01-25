import toast from 'react-hot-toast';
import { CookieManager } from './cookies';

// Custom toast styles
const toastStyles = {
  success: {
    style: {
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      color: 'white',
      fontWeight: '500',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
      border: 'none',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#10B981'
    },
    duration: 4000,
  },
  error: {
    style: {
      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      color: 'white',
      fontWeight: '500',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
      border: 'none',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#EF4444'
    },
    duration: 6000,
  },
  loading: {
    style: {
      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      color: 'white',
      fontWeight: '500',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
      border: 'none',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#3B82F6'
    },
  },
  warning: {
    style: {
      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      color: 'white',
      fontWeight: '500',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
      border: 'none',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#F59E0B'
    },
    duration: 5000,
  },
  info: {
    style: {
      background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
      color: 'white',
      fontWeight: '500',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
      border: 'none',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#6366F1'
    },
    duration: 4000,
  }
};

export const NotificationManager = {
  success: (message, options = {}) => {
    const preferences = CookieManager.getPreferences();
    if (!preferences.notifications.showSuccess) return null;
    return toast.success(message, { ...toastStyles.success, ...options, icon: '✅' });
  },
  error: (message, options = {}) => {
    const preferences = CookieManager.getPreferences();
    if (!preferences.notifications.showWarnings) return null;
    return toast.error(message, { ...toastStyles.error, ...options, icon: '❌' });
  },
  warning: (message, options = {}) => {
    const preferences = CookieManager.getPreferences();
    if (!preferences.notifications.showWarnings) return null;
    return toast(message, { ...toastStyles.warning, ...options, icon: '⚠️' });
  },
  info: (message, options = {}) => {
    return toast(message, { ...toastStyles.info, ...options, icon: 'ℹ️' });
  },
  loading: (message, options = {}) => {
    return toast.loading(message, { ...toastStyles.loading, ...options });
  },
  custom: (component, options = {}) => {
    return toast.custom(component, { duration: 4000, ...options });
  },
  promise: (promise, messages, options = {}) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong',
      },
      { loading: toastStyles.loading, success: toastStyles.success, error: toastStyles.error, ...options }
    );
  },
  resumeSaved: (resumeName) => {
    return NotificationManager.success(`🎉 "${resumeName}" saved successfully!`, { duration: 3000 });
  },
  resumeCreated: (resumeName) => {
    return NotificationManager.success(`✨ New resume "${resumeName}" created!`, { duration: 4000 });
  },
  resumeDeleted: (resumeName) => {
    return NotificationManager.info(`🗑️ Resume "${resumeName}" deleted`, { duration: 3000 });
  },
  resumeCompleted: (resumeName) => {
    return NotificationManager.custom(
      (t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0"><div className="text-2xl">🎉</div></div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-white">Resume Completed!</p>
                <p className="mt-1 text-sm text-green-100">"{resumeName}" is ready for download and printing!</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-green-200">
            <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-100 hover:text-white focus:outline-none">✕</button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  },
  storageLimit: () => {
    return NotificationManager.warning('📊 Storage limit reached! You can store up to 5 resumes.', { duration: 5000 });
  },
  printReady: () => {
    return NotificationManager.info('🖨️ Resume ready for printing!', { duration: 3000 });
  },
  tipOfTheDay: (tip) => {
    const preferences = CookieManager.getPreferences();
    if (!preferences.notifications.showTips) return null;
    return NotificationManager.custom(
      (t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0"><div className="text-xl">💡</div></div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-white">Pro Tip</p>
                <p className="mt-1 text-sm text-purple-100">{tip}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-purple-200">
            <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-purple-100 hover:text-white focus:outline-none">✕</button>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  },
  dismiss: () => { toast.dismiss(); },
  dismissToast: (toastId) => { toast.dismiss(toastId); }
};

export default NotificationManager;