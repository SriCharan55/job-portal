import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Auth Pages
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

// Admin Pages
import AdminJobs from './pages/Admin/AdminJobs';
import JobForm from './pages/Admin/JobForm';

// User Pages
import Jobs from './pages/User/Jobs';
import JobDetails from './pages/User/JobDetails';
import MyApplications from './pages/User/MyApplications';
import MyFavourites from './pages/User/MyFavourites';

// Landing Page
import Index from './pages/Index';

const AppRoutes = () => {
  const { isAuthenticated, isAdmin, isCandidate, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          isAuthenticated 
            ? (isAdmin ? <Navigate to="/admin/jobs" /> : <Navigate to="/jobs" />)
            : <Index />
        } 
      />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
      />

      {/* Admin Routes */}
      <Route
        path="/admin/jobs"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/jobs/new"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <JobForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/jobs/edit/:id"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <JobForm />
          </ProtectedRoute>
        }
      />

      {/* Candidate Routes */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <Jobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <JobDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-applications"
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <MyApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-favourites"
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <MyFavourites />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <AppRoutes />
        </main>
        
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
