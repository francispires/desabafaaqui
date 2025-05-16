import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { HomePage } from './pages/HomePage';
import { CompaniesPage } from './pages/CompaniesPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';
import { ComplaintDetailPage } from './pages/ComplaintDetailPage';
import { CreateComplaintPage } from './pages/CreateComplaintPage';
import { RankingsPage } from './pages/RankingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  
  if (!isSignedIn) {
    router.push('/sign-in');
    return null;
  }
  
  return <>{children}</>;
};

function App() {
  const router = useRouter();
  const { pathname } = router;

  const renderPage = () => {
    switch (pathname) {
      case '/':
        return <HomePage />;
      case '/sign-in':
        return <SignIn />;
      case '/sign-up':
        return <SignUp />;
      case '/companies':
        return (
          <ProtectedRoute>
            <CompaniesPage />
          </ProtectedRoute>
        );
      case '/companies/[id]':
        return (
          <ProtectedRoute>
            <CompanyDetailPage />
          </ProtectedRoute>
        );
      case '/complaints':
        return (
          <ProtectedRoute>
            <ComplaintsPage />
          </ProtectedRoute>
        );
      case '/complaints/[id]':
        return (
          <ProtectedRoute>
            <ComplaintDetailPage />
          </ProtectedRoute>
        );
      case '/create-complaint':
        return (
          <ProtectedRoute>
            <CreateComplaintPage />
          </ProtectedRoute>
        );
      case '/rankings':
        return (
          <ProtectedRoute>
            <RankingsPage />
          </ProtectedRoute>
        );
      default:
        return <NotFoundPage />;
    }
  };

  return renderPage();
}

export default App;