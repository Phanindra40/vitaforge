import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';

import Header from './components/Header';
import Home from './components/Home';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import SignInPage from './auth/SignInPage';
import SignUpPage from './auth/SignUpPage';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/sign-in', '/sign-up'].includes(location.pathname);

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
    <Route
      path="/dashboard"
      element={
        <SignedIn>
          <Dashboard />
        </SignedIn>
      }
    />
    <Route path="/sign-in" element={<SignInPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="*" element={<RedirectToSignIn />} />
  </Routes>
);

const App = () => (
  <ClerkProvider publishableKey={clerkPublishableKey}>
    <Router>
      <Layout>
        <SignedIn>
          <AppRoutes />
        </SignedIn>
        <SignedOut>
          <AppRoutes />
        </SignedOut>
      </Layout>
    </Router>
  </ClerkProvider>
);

export default App;