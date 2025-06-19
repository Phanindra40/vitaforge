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
  RedirectToSignIn,
} from '@clerk/clerk-react';

import Header from './components/Header';
import Home from './components/Home';
import Features from './components/Features';
import SignInPage from './auth/signin';
import Dashboard from './components/Dashboard';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// 🟢 Custom wrapper to connect Clerk with Router
const ClerkWithRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      navigate={(to) => navigate(to)}
    >
      <Layout>
        <AppRoutes />
      </Layout>
    </ClerkProvider>
  );
};

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
    <Route
      path="/dashboard"
      element={
        <SignedIn>
          <Dashboard />
        </SignedIn>
      }
    />
    <Route path="*" element={<Home />} />
  </Routes>
);

const App = () => {
  return (
    <Router>
      <ClerkWithRouter />
    </Router>
  );
};

export default App;
