import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TrackData from './pages/TrackData';
import CoachView from './pages/CoachView';
import Profile from './pages/Profile';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/track"
        element={
          <PrivateRoute>
            <TrackData />
          </PrivateRoute>
        }
      />
      <Route
        path="/coach"
        element={
          <PrivateRoute>
            <CoachView />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            {user?.role === 'coach' ? (
              <Navigate to="/coach" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )}
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

function App() {
  // Get base path from vite config - automatically matches the base in vite.config.ts
  // BASE_URL is always available in Vite and matches the base path from vite.config.ts
  const basePath = import.meta.env.BASE_URL;
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router basename={basePath}>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

