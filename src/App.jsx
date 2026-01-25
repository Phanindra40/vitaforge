import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';

import Header from './components/Header';
import Home from './components/Home';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import SignInPage from './auth/signin';
import SignUpPage from './auth/SignUpPage';
import AddResume from './components/resume/addresume';
import ContactPage from './components/contact';
import ResumeForm from './components/resume/resumeform';
import PreviewPage from './components/resume/PreviewPage';
import CookieConsentPopup from './components/CookieConsentPopup';
import { NotificationContainer } from './utils/notifications.jsx';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const ClerkWithRouter = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      navigate={(to) => navigate(to)}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#7c3aed", // Purple-600
          colorText: "#374151", // Gray-700
          colorTextSecondary: "#6b7280", // Gray-500
          colorBackground: "#ffffff",
          colorInputBackground: "#ffffff",
          colorInputText: "#111827",
          borderRadius: "0.75rem", // rounded-xl
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        },
        elements: {
          card: "shadow-xl border border-gray-100",
          headerTitle: "text-xl font-semibold",
          headerSubtitle: "text-gray-600 text-sm",
          socialButtonsBlockButton: "border border-gray-200 hover:border-gray-300 text-gray-700 font-medium",
          formButtonPrimary: "bg-purple-600 hover:bg-purple-700 font-semibold shadow-sm",
          formFieldInput: "border border-gray-200 focus:border-purple-300 focus:ring-purple-200",
          footerActionLink: "text-purple-600 hover:text-purple-700 font-medium text-sm"
        }
      }}
    >
      <Layout>
        <AppRoutes />
      </Layout>
    </ClerkProvider>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname.startsWith('/sign-in') ||
    location.pathname.startsWith('/sign-up');

  return (
    <>
      {!isAuthPage && <Header />}
      {children}
    </>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/features" element={<Features />} />
    <Route path="/addresume" element={<ResumeForm resumeName="New Resume" />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/dashboard" element={<SignedIn><Dashboard /></SignedIn>} />

    {/* Preview Page */}
    <Route path="/preview/:resumeId" element={<PreviewPage />} />

    {/* Custom Sign In */}
    <Route
      path="/sign-in"
      element={<SignInPage />}
    />

    {/* Clerk Sign Up */}
    <Route path="/sign-up/*" element={<SignUpPage />} />

    {/* Fallback */}
    <Route path="*" element={<Home />} />
  </Routes>
);

const App = () => {
  return (
    <Router>
      <ClerkWithRouter />
      {/* Global Notification Container */}
      <NotificationContainer />
      {/* Cookie Consent Popup */}
      <CookieConsentPopup />
    </Router>
  );
};

export default App;
