import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      // Redirect coaches to coach view, clients to dashboard
      const isCoach = email.toLowerCase().includes('coach');
      navigate(isCoach ? '/coach' : '/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="ios-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-ios-darkGray mb-2">Nutrition Tracker</h1>
            <p className="text-ios-gray">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ios-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ios-input"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button type="submit" className="ios-button w-full">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-ios-gray">
            <p>Demo: Use any email/password to login</p>
            <p className="mt-1">Add "coach" to email to access coach view</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

