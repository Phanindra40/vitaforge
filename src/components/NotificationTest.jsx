import React from 'react';
import { NotificationManager } from '../utils/notifications';

// Test component to demonstrate cross-platform notifications
const NotificationTest = () => {
  const testNotifications = () => {
    // Test different notification types
    setTimeout(() => NotificationManager.success("✅ Success notification - works great!"), 100);
    setTimeout(() => NotificationManager.info("ℹ️ Info notification - check the positioning!"), 1200);
    setTimeout(() => NotificationManager.warning("⚠️ Warning notification - responsive sizing!"), 2400);
    setTimeout(() => NotificationManager.error("❌ Error notification - longer duration test"), 3600);
    setTimeout(() => NotificationManager.resumeCompleted("Test Resume"), 5000);
    setTimeout(() => NotificationManager.tipOfTheDay("Notifications now work perfectly across all devices! 📱💻"), 6500);
  };

  const testLoadingNotification = () => {
    const loadingToast = NotificationManager.loading("Testing cross-platform loading...");
    
    setTimeout(() => {
      NotificationManager.dismissToast(loadingToast);
      NotificationManager.success("Loading completed! Notifications scale beautifully.");
    }, 3000);
  };

  const testPromiseNotification = () => {
    const testPromise = new Promise((resolve) => {
      setTimeout(() => resolve("Cross-platform test successful!"), 2500);
    });

    NotificationManager.promise(
      testPromise,
      {
        loading: '🔄 Testing promise notifications...',
        success: '🎉 Promise notifications work perfectly!',
        error: '❌ Something went wrong with the promise',
      }
    );
  };

  const deviceInfo = {
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: window.innerWidth > 1024,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    isLandscape: window.innerWidth > window.innerHeight,
    isTouchDevice: 'ontouchstart' in window,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      background: '#f8f9fa',
      borderRadius: '12px',
      marginTop: '20px'
    }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>
        🧪 Cross-Platform Notification Test
      </h3>
      
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        background: 'white',
        borderRadius: '8px',
        fontSize: '14px',
        fontFamily: 'monospace'
      }}>
        <strong>Current Device Detection:</strong><br/>
        📱 Mobile: {deviceInfo.isMobile ? '✅' : '❌'}<br/>
        📟 Tablet: {deviceInfo.isTablet ? '✅' : '❌'}<br/>
        💻 Desktop: {deviceInfo.isDesktop ? '✅' : '❌'}<br/>
        📐 Screen: {deviceInfo.screenWidth}×{deviceInfo.screenHeight}<br/>
        🔄 Landscape: {deviceInfo.isLandscape ? '✅' : '❌'}<br/>
        👆 Touch: {deviceInfo.isTouchDevice ? '✅' : '❌'}<br/>
        🎭 Reduced Motion: {deviceInfo.prefersReducedMotion ? '✅' : '❌'}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        flexWrap: 'wrap',
        marginBottom: '15px'
      }}>
        <button 
          onClick={testNotifications}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🎯 Test All Notification Types
        </button>
        
        <button 
          onClick={testLoadingNotification}
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          ⏳ Test Loading Notifications
        </button>
        
        <button 
          onClick={testPromiseNotification}
          style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🔄 Test Promise Notifications
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => NotificationManager.dismiss()}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '10px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          🚫 Dismiss All
        </button>
        
        <button 
          onClick={() => NotificationManager.resumeSaved("Cross-Platform Test")}
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          💾 Test Resume Saved
        </button>

        <button 
          onClick={() => NotificationManager.printReady()}
          style={{
            background: '#17a2b8',
            color: 'white',
            border: 'none',
            padding: '10px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          🖨️ Test Print Ready
        </button>
      </div>

      <p style={{ 
        marginTop: '20px', 
        fontSize: '13px', 
        color: '#666',
        lineHeight: '1.5'
      }}>
        <strong>Test Instructions:</strong><br/>
        1. Try resizing your browser window to test responsive positioning<br/>
        2. Test on mobile device by opening DevTools and toggling device emulation<br/>
        3. Check that notifications don't interfere with content scrolling<br/>
        4. Verify positioning works in both portrait and landscape orientations<br/>
        5. Notice how notification size, spacing, and duration adapt to your device
      </p>
    </div>
  );
};

export default NotificationTest;