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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md">
        <div className="ios-card p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-ios-darkGray mb-3 tracking-tight">Nutrition Tracker</h1>
            <p className="text-ios-gray font-medium">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
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
              <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
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
              <div className="text-red-500 text-sm text-center font-medium bg-red-50 py-2.5 px-3 rounded-ios-lg border border-red-200">
                {error}
              </div>
            )}

            <button type="submit" className="ios-button w-full mt-6">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-ios-gray space-y-1">
            <p className="font-medium">Demo: Use any email/password to login</p>
            <p>Add "coach" to email to access coach view</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

