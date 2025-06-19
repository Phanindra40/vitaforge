import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Header from './components/Header';
import Home from './components/Home';
import Features from './components/Features';
import SignInPage from './auth/signin';
import Dashboard from './components/Dashboard';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Wrapper to handle conditional layout (hide Header on /sign-in)
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/sign-in';

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
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/sign-in/*" element={<SignInPage />} />
    <Route path="*" element={<RedirectToSignIn />} />
  </Routes>
);

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Router>
        
          <SignedIn>
            <AppRoutes />
          </SignedIn>
          <SignedOut>
            <AppRoutes />
          </SignedOut>
        
      </Router>
    </ClerkProvider>
  );
};

export default App;
