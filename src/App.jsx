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
  SignIn,
  SignUp,
} from '@clerk/clerk-react';

import Header from './components/Header';
import Home from './components/Home';
import Features from './components/Features';
import Dashboard from './components/Dashboard';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

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

    {/* Clerk Sign In */}
    <Route
      path="/sign-in/*"
      element={
        <div className="flex justify-center items-center min-h-screen bg-white">
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      }
    />

    {/* Clerk Sign Up */}
    
<Route path="/sign-up/*" element={<SignUpPage />} />




    {/* Protected Dashboard */}
    <Route
      path="/dashboard"
      element={
        <SignedIn>
          <Dashboard />
        </SignedIn>
        
      }
    />

    {/* Fallback route */}
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
