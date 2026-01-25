import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CookieManager } from '../utils/cookies';
import NotificationManager from '../utils/notificationManager.jsx';

const CookieConsentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = CookieManager.getConsentStatus();
    if (consentStatus === 'pending') {
      // Only show on user interaction, not auto-popup
      const handleUserInteraction = () => {
        setIsVisible(true);
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
      };
      
      // Show after 8 seconds if no interaction (less aggressive)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000);
      
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('scroll', handleUserInteraction);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
      };
    }
  }, []);

  const handleAccept = () => {
    CookieManager.setConsent(true);
    setIsVisible(false);
    NotificationManager.success(
      '🍪 Cookie preferences saved! Enjoy your personalized experience.',
      { duration: 3000 }
    );
  };

  const handleDecline = () => {
    CookieManager.setConsent(false);
    setIsVisible(false);
    NotificationManager.info(
      'Cookie preferences saved. You can change this anytime.',
      { duration: 3000 }
    );
  };

  const handleAcceptEssential = () => {
    CookieManager.setConsent(false); // Only essential cookies
    setIsVisible(false);
    NotificationManager.info(
      'Essential cookies only. Limited personalization available.',
      { duration: 4000 }
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />
          
          {/* Cookie Consent Popup */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.4 
            }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">🍪</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Cookie Preferences
                    </h3>
                    <p className="text-purple-100 text-sm">
                      Enhance your VitaForge experience
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  We use cookies to provide you with the best experience, save your preferences, 
                  and help improve our resume builder. Your privacy is important to us.
                </p>

                {/* Toggle Details */}
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium mb-4 flex items-center space-x-1"
                >
                  <span>What cookies do we use?</span>
                  <motion.span
                    animate={{ rotate: showDetails ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.span>
                </button>

                {/* Cookie Details */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Essential Cookies</h4>
                          <p className="text-xs text-gray-600">Required for basic functionality and security</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Preference Cookies</h4>
                          <p className="text-xs text-gray-600">Remember your settings, theme, and customizations</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Analytics Cookies</h4>
                          <p className="text-xs text-gray-600">Help us understand usage and improve features (anonymous)</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Accept All */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAccept}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-200"
                  >
                    ✨ Accept All Cookies
                  </motion.button>

                  {/* Button Row */}
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAcceptEssential}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-3 rounded-lg transition-all duration-200 text-sm"
                    >
                      Essential Only
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDecline}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-3 rounded-lg transition-all duration-200 text-sm"
                    >
                      Decline All
                    </motion.button>
                  </div>
                </div>

                {/* Privacy Note */}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  You can change your preferences anytime in settings. 
                  <br />
                  <span className="text-purple-600">We respect your privacy.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentPopup;