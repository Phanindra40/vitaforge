import toast, { Toaster } from 'react-hot-toast';
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

// Notification Manager
export const NotificationManager = {
  // Success notifications
  success: (message, options = {}) => {
    const preferences = CookieManager.getPreferences();
    if (!preferences.notifications.showSuccess) return null;
    
    return toast.success(message, {
      ...toastStyles.success,
      ...options,
      icon: '✅',
    });
  },

  // Error notifications
  error: (message, options = {}) => {
    const preferences = CookieManager.getPreferences();
    if (!preferences.notifications.showWarnings) return null;
    
    return toast.error(message, {
      ...toastStyles.error,
      ...options,
      icon: '❌',
    });
  },

  // Warning notifications
  warning: (message, options = {}) => {
    const preferences = CookieManager.getPreferences();
    if (!preferences.notifications.showWarnings) return null;
    
    return toast(message, {
      ...toastStyles.warning,
      ...options,
      icon: '⚠️',
    });
  },

  // Info notifications
  info: (message, options = {}) => {
    return toast(message, {
      ...toastStyles.info,
      ...options,
      icon: 'ℹ️',
    });
  },

  // Loading notifications
  loading: (message, options = {}) => {
    return toast.loading(message, {
      ...toastStyles.loading,
      ...options,
    });
  },

  // Custom notifications
  custom: (component, options = {}) => {
    return toast.custom(component, {
      duration: 4000,
      ...options,
    });
  },

  // Promise-based notifications
  promise: (promise, messages, options = {}) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong',
      },
      {
        loading: toastStyles.loading,
        success: toastStyles.success,
        error: toastStyles.error,
        ...options,
      }
    );
  },

  // Resume-specific notifications
  resumeSaved: (resumeName) => {
    return NotificationManager.success(
      `🎉 "${resumeName}" saved successfully!`,
      { duration: 3000 }
    );
  },

  resumeCreated: (resumeName) => {
    return NotificationManager.success(
      `✨ New resume "${resumeName}" created!`,
      { duration: 4000 }
    );
  },

  resumeDeleted: (resumeName) => {
    return NotificationManager.info(
      `🗑️ Resume "${resumeName}" deleted`,
      { duration: 3000 }
    );
  },

  resumeCompleted: (resumeName) => {
    return NotificationManager.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="text-2xl">🎉</div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-white">
                  Resume Completed!
                </p>
                <p className="mt-1 text-sm text-green-100">
                  "{resumeName}" is ready for download and printing!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-green-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-100 hover:text-white focus:outline-none"
            >
              ✕
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  },

  storageLimit: () => {
    return NotificationManager.warning(
      '📊 Storage limit reached! You can store up to 5 resumes.',
      { duration: 5000 }
    );
  },

  printReady: () => {
    return NotificationManager.info(
      '🖨️ Resume ready for printing!',
      { duration: 3000 }
    );
  },

  tipOfTheDay: (tip) => {
    const preferences = CookieManager.getPreferences();
    if (!preferences.notifications.showTips) return null;
    
    return NotificationManager.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="text-xl">💡</div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-white">
                  Pro Tip
                </p>
                <p className="mt-1 text-sm text-purple-100">
                  {tip}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-purple-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-purple-100 hover:text-white focus:outline-none"
            >
              ✕
            </button>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  },

  // Dismiss all toasts
  dismiss: () => {
    toast.dismiss();
  },

  // Dismiss specific toast
  dismissToast: (toastId) => {
    toast.dismiss(toastId);
  }
};

// Toast container component with responsive, platform-optimized styles
export const NotificationContainer = () => {
  const preferences = CookieManager.getPreferences();
  
  // Enhanced device detection
  const getDeviceInfo = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;
    const isTouchDevice = 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return {
      isMobile: width <= 768,
      isTablet: width > 768 && width <= 1024,
      isDesktop: width > 1024,
      isLandscape,
      isTouchDevice,
      prefersReducedMotion,
      hasNotch: CSS.supports('padding-top: env(safe-area-inset-top)'), // iPhone X+ detection
    };
  };

  const device = getDeviceInfo();
  
  // Smart positioning based on device and orientation
  const getSmartPosition = () => {
    if (device.isMobile) {
      // Mobile: use top-center for better readability, especially in landscape
      return device.isLandscape ? 'top-center' : 'top-center';
    }
    
    if (device.isTablet) {
      // Tablet: top-right works well but consider orientation
      return device.isLandscape ? 'top-right' : 'top-center';
    }
    
    // Desktop: respect user preferences or default to top-right
    return preferences.notifications.position || 'top-right';
  };

  // Optimized container positioning with safe areas
  const getOptimizedContainerStyle = () => {
    const baseStyle = {
      zIndex: 9999,
      pointerEvents: 'none', // Allow clicks through container
    };

    if (device.isMobile) {
      const safeAreaTop = device.hasNotch ? 'calc(60px + env(safe-area-inset-top))' : '60px';
      const safeAreaSides = device.hasNotch ? 'calc(16px + env(safe-area-inset-left))' : '16px';
      const safeAreaBottom = device.hasNotch ? 'calc(80px + env(safe-area-inset-bottom))' : '80px';

      return {
        ...baseStyle,
        top: device.isLandscape ? 10 : safeAreaTop,
        right: safeAreaSides,
        bottom: device.isLandscape ? 10 : safeAreaBottom,
        left: safeAreaSides,
      };
    }
    
    if (device.isTablet) {
      return {
        ...baseStyle,
        top: 20,
        right: 20,
        bottom: 20,
        left: device.isLandscape ? 60 : 20, // More space from left in landscape
      };
    }
    
    // Desktop
    return {
      ...baseStyle,
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };
  };

  // Performance-optimized spacing
  const getOptimizedGutter = () => {
    if (device.isMobile) {
      return device.isLandscape ? 4 : 6;  // Tighter in landscape
    }
    if (device.isTablet) return 8;
    return 10;
  };

  // Performance-optimized durations
  const getOptimizedDuration = () => {
    if (device.isMobile) return 2500;  // Faster on mobile
    if (device.isTablet) return 3500;  // Medium on tablet
    return 4000;  // Standard on desktop
  };
  
  return (
    <Toaster
      position={getSmartPosition()}
      reverseOrder={false}
      gutter={getOptimizedGutter()}
      containerClassName="notification-container"
      containerStyle={getOptimizedContainerStyle()}
      toastOptions={{
        duration: getOptimizedDuration(),
        style: {
          background: '#fff',
          color: '#363636',
          fontSize: device.isMobile ? '13px' : device.isTablet ? '14px' : '15px',
          fontWeight: '500',
          maxWidth: device.isMobile 
            ? '90vw' 
            : device.isTablet 
              ? '380px' 
              : '420px',
          minWidth: device.isMobile ? '280px' : '300px',
          borderRadius: device.isMobile ? '10px' : '12px',
          padding: device.isMobile 
            ? (device.isLandscape ? '10px 14px' : '12px 16px')
            : device.isTablet 
              ? '14px 18px'
              : '16px 20px',
          boxShadow: device.isMobile 
            ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
            : device.isTablet
              ? '0 6px 18px rgba(0, 0, 0, 0.12)'
              : '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          // Performance optimizations
          willChange: device.prefersReducedMotion ? 'auto' : 'transform, opacity',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          pointerEvents: 'auto', // Re-enable for toast content
        },
        // Platform-optimized class names for CSS targeting
        className: [
          device.isMobile ? 'toast-mobile' : device.isTablet ? 'toast-tablet' : 'toast-desktop',
          device.isLandscape ? 'toast-landscape' : 'toast-portrait',
          device.isTouchDevice ? 'toast-touch' : 'toast-mouse',
          device.prefersReducedMotion ? 'toast-reduced-motion' : 'toast-animated'
        ].join(' '),
        
        // Enhanced responsive styles for different toast types
        success: {
          ...toastStyles.success,
          style: {
            ...toastStyles.success.style,
            fontSize: device.isMobile ? '13px' : device.isTablet ? '14px' : '15px',
            padding: device.isMobile 
              ? (device.isLandscape ? '10px 14px' : '12px 16px')
              : device.isTablet 
                ? '14px 18px'
                : '16px 20px',
          }
        },
        error: {
          ...toastStyles.error,
          style: {
            ...toastStyles.error.style,
            fontSize: device.isMobile ? '13px' : device.isTablet ? '14px' : '15px',
            padding: device.isMobile 
              ? (device.isLandscape ? '10px 14px' : '12px 16px')
              : device.isTablet 
                ? '14px 18px'
                : '16px 20px',
          },
          duration: device.isMobile ? 4000 : 6000, // Keep errors visible longer
        },
        loading: {
          ...toastStyles.loading,
          style: {
            ...toastStyles.loading.style,
            fontSize: device.isMobile ? '13px' : device.isTablet ? '14px' : '15px',
            padding: device.isMobile 
              ? (device.isLandscape ? '10px 14px' : '12px 16px')
              : device.isTablet 
                ? '14px 18px'
                : '16px 20px',
          }
        },
      }}
    />
  );
};

export default NotificationManager;