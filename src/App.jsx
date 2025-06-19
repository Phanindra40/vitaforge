import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';

import Header from './components/Header';
import Home from './components/Home';
import Features from './components/Features';
import SignInPage from './auth/signin';
import Dashboard from './components/Dashboard';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Layout component to conditionally hide Header on /sign-in
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/sign-in');

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
    <Route path="/sign-in/*" element={<SignInPage />} />

    {/* Protected route for dashboard */}
    <Route
      path="/dashboard"
      element={
        <SignedIn>
          <Dashboard />
        </SignedIn>
      }
    />

    {/* Redirect unknown routes to home */}
    <Route path="*" element={<Home />} />
  </Routes>
);

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </ClerkProvider>
  );
};

export default App;
