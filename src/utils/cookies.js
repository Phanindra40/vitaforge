import Cookies from 'js-cookie';

// Cookie names
const COOKIE_NAMES = {
  CONSENT: 'vitaforge_cookie_consent',
  PREFERENCES: 'vitaforge_user_preferences',
  SESSION: 'vitaforge_session',
  ONBOARDING: 'vitaforge_onboarding',
  ANALYTICS: 'vitaforge_analytics'
};

// Cookie Manager
export const CookieManager = {
  // Cookie consent
  setConsent: (granted) => {
    Cookies.set(COOKIE_NAMES.CONSENT, granted ? 'granted' : 'denied', { 
      expires: 365, // 1 year
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax'
    });
  },

  hasConsent: () => {
    return Cookies.get(COOKIE_NAMES.CONSENT) === 'granted';
  },

  getConsentStatus: () => {
    return Cookies.get(COOKIE_NAMES.CONSENT) || 'pending';
  },

  // User preferences
  setPreferences: (preferences) => {
    if (!CookieManager.hasConsent()) return false;
    
    const existingPrefs = CookieManager.getPreferences();
    const updatedPrefs = { ...existingPrefs, ...preferences };
    
    Cookies.set(COOKIE_NAMES.PREFERENCES, JSON.stringify(updatedPrefs), {
      expires: 365,
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax'
    });
    return true;
  },

  getPreferences: () => {
    if (!CookieManager.hasConsent()) return getDefaultPreferences();
    
    try {
      const prefs = Cookies.get(COOKIE_NAMES.PREFERENCES);
      return prefs ? { ...getDefaultPreferences(), ...JSON.parse(prefs) } : getDefaultPreferences();
    } catch (error) {
      console.error('Error parsing preferences cookie:', error);
      return getDefaultPreferences();
    }
  },

  // Session management
  setSession: (sessionData) => {
    if (!CookieManager.hasConsent()) return false;
    
    Cookies.set(COOKIE_NAMES.SESSION, JSON.stringify(sessionData), {
      expires: 1, // 1 day
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax'
    });
    return true;
  },

  getSession: () => {
    if (!CookieManager.hasConsent()) return null;
    
    try {
      const session = Cookies.get(COOKIE_NAMES.SESSION);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Error parsing session cookie:', error);
      return null;
    }
  },

  // Onboarding status
  setOnboardingComplete: (completed = true) => {
    if (!CookieManager.hasConsent()) return false;
    
    Cookies.set(COOKIE_NAMES.ONBOARDING, completed ? 'completed' : 'pending', {
      expires: 365,
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax'
    });
    return true;
  },

  hasCompletedOnboarding: () => {
    if (!CookieManager.hasConsent()) return false;
    return Cookies.get(COOKIE_NAMES.ONBOARDING) === 'completed';
  },

  // Analytics preferences
  setAnalyticsPreference: (enabled) => {
    if (!CookieManager.hasConsent()) return false;
    
    Cookies.set(COOKIE_NAMES.ANALYTICS, enabled ? 'enabled' : 'disabled', {
      expires: 365,
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax'
    });
    return true;
  },

  getAnalyticsPreference: () => {
    if (!CookieManager.hasConsent()) return false;
    return Cookies.get(COOKIE_NAMES.ANALYTICS) === 'enabled';
  },

  // Clear all cookies
  clearAll: () => {
    Object.values(COOKIE_NAMES).forEach(name => {
      Cookies.remove(name);
    });
  }
};

// Default user preferences
function getDefaultPreferences() {
  return {
    theme: 'light',
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    showTips: true,
    previewMode: 'side', // 'side' or 'bottom'
    defaultSectionTitles: {
      summary: "PROFESSIONAL SUMMARY",
      experience: "PROFESSIONAL EXPERIENCE",
      projects: "KEY PROJECTS",
      education: "EDUCATION",
      skills: "CORE COMPETENCIES"
    },
    printSettings: {
      paperSize: 'A4',
      margins: '0.5in',
      fontSize: '12px'
    },
    notifications: {
      showSuccess: true,
      showWarnings: true,
      showTips: true,
      position: 'top-right'
    }
  };
}

export default CookieManager;