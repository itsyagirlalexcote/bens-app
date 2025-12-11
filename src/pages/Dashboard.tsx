import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { DailyMetrics, MacroGoals } from '../types';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [todayMetrics, setTodayMetrics] = useState<DailyMetrics | null>(null);
  const [isShared, setIsShared] = useState(false);
  const [goals, setGoals] = useState<MacroGoals | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const metrics = storage.getMetrics(today);
    setTodayMetrics(metrics);
    
    // Check if already shared today
    const shared = storage.getSharedData();
    const todayShared = shared.find(
      (s) => s.date === today && s.clientId === user?.id
    );
    setIsShared(!!todayShared);

    // Load macro goals
    const savedGoals = storage.getMacroGoals();
    setGoals(savedGoals);
  }, [user]);

  const handleShare = () => {
    if (!todayMetrics || !user) return;

    const sharedData = {
      clientId: user.id,
      clientName: user.name,
      date: todayMetrics.date,
      metrics: todayMetrics,
      sharedAt: new Date().toISOString(),
    };

    storage.addSharedData(sharedData);
    setIsShared(true);
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const MetricCard = ({ title, value, unit, icon, goal }: {
    title: string;
    value: number;
    unit: string;
    icon: string;
    goal?: number;
  }) => {
    const percentage = goal ? Math.min((value / goal) * 100, 100) : null;
    
    return (
      <div className="ios-card p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-ios-gray text-sm font-medium tracking-wide uppercase">{title}</span>
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="text-3xl font-bold text-ios-darkGray mb-1">
          {value.toFixed(1)}
          <span className="text-lg text-ios-gray ml-1.5 font-medium">{unit}</span>
        </div>
        {goal && (
          <div className="mt-4 pt-4 border-t border-gray-100/50">
            <div className="flex items-center justify-between text-xs text-ios-gray mb-2">
              <span className="font-medium">Goal: {goal.toFixed(0)}{unit}</span>
              <span className="font-semibold text-ios-darkGray">{percentage?.toFixed(0)}%</span>
            </div>
            <div className="ios-progress-bar">
              <div
                className={`ios-progress-fill ${
                  (percentage || 0) >= 100
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : (percentage || 0) >= 75
                    ? 'bg-gradient-to-r from-ios-blue to-ios-blueDark'
                    : 'bg-gradient-to-r from-orange-400 to-amber-500'
                }`}
                style={{ width: `${Math.min(percentage || 0, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-ios-lightGray pb-24">
      <div className="ios-header sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-5 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ios-darkGray tracking-tight">
                Welcome back, {user?.name}
              </h1>
              <p className="text-ios-gray text-sm mt-1.5 font-medium">{getTodayDate()}</p>
            </div>
            <div className="flex items-center gap-5">
              {user?.role !== 'coach' && (
                <Link
                  to="/profile"
                  className="text-ios-blue text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  Profile
                </Link>
              )}
              <button
                onClick={logout}
                className="text-ios-gray text-sm font-semibold hover:text-ios-darkGray transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {user?.role === 'coach' && (
        <div className="max-w-4xl mx-auto px-5 mt-5">
          <Link
            to="/coach"
            className="ios-card p-5 block hover:shadow-ios-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-ios-darkGray">View Client Data</h3>
                <p className="text-sm text-ios-gray mt-0.5">Access coach dashboard</p>
              </div>
              <span className="text-ios-blue text-xl">→</span>
            </div>
          </Link>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-5 mt-6">
        {user?.role === 'coach' ? (
          <div className="ios-card p-8 text-center">
            <p className="text-ios-gray mb-4">
              As a coach, you can view client data in the Coach Dashboard
            </p>
            <Link to="/coach" className="ios-button inline-block">
              Go to Coach Dashboard
            </Link>
          </div>
        ) : !todayMetrics ? (
          <div className="ios-card p-10 text-center">
            <p className="text-ios-gray mb-6 text-base">No data tracked for today</p>
            <div className="flex gap-3 justify-center">
              <Link to="/track" className="ios-button">
                Start Tracking
              </Link>
              {!goals && (
                <Link to="/profile" className="ios-button-secondary">
                  Set Goals First
                </Link>
              )}
            </div>
          </div>
        ) : (
          <>
            {!goals && (
              <div className="ios-card p-5 mb-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-blue-900">
                      Set your macro goals to track progress
                    </p>
                    <p className="text-sm text-blue-700/80 mt-1">
                      Go to Profile to configure your daily targets
                    </p>
                  </div>
                  <Link to="/profile" className="ios-button text-sm px-5 py-2.5">
                    Set Goals
                  </Link>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <MetricCard
                title="Calories"
                value={todayMetrics.calories}
                unit="kcal"
                icon="🔥"
                goal={goals?.calories}
              />
              <MetricCard
                title="Protein"
                value={todayMetrics.protein}
                unit="g"
                icon="🥩"
                goal={goals?.protein}
              />
              <MetricCard
                title="Carbs"
                value={todayMetrics.carbs}
                unit="g"
                icon="🍞"
                goal={goals?.carbs}
              />
              <MetricCard
                title="Fat"
                value={todayMetrics.fat}
                unit="g"
                icon="🥑"
                goal={goals?.fat}
              />
              <MetricCard
                title="Water"
                value={todayMetrics.water / 1000}
                unit="L"
                icon="💧"
                goal={goals ? goals.water / 1000 : undefined}
              />
              <MetricCard
                title="Sleep"
                value={todayMetrics.sleep}
                unit="hrs"
                icon="😴"
                goal={goals?.sleep}
              />
            </div>

            <div className="ios-card p-6 mb-6">
              <h2 className="text-lg font-bold mb-5 text-ios-darkGray">Today's Meals</h2>
              {todayMetrics.meals.length === 0 ? (
                <p className="text-ios-gray text-sm">No meals logged yet</p>
              ) : (
                <div className="space-y-2.5">
                  {todayMetrics.meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="flex items-center justify-between p-4 bg-ios-lightGray/60 rounded-ios-lg border border-gray-100/50"
                    >
                      <div>
                        <p className="font-semibold text-ios-darkGray">{meal.name}</p>
                        <p className="text-sm text-ios-gray mt-0.5">{meal.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-ios-darkGray">{meal.calories} kcal</p>
                        <p className="text-xs text-ios-gray mt-0.5">
                          P: {meal.protein}g C: {meal.carbs}g F: {meal.fat}g
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Link to="/track" className="ios-button flex-1 text-center">
                Update Data
              </Link>
              <button
                onClick={handleShare}
                disabled={isShared}
                className={`ios-button flex-1 ${
                  isShared
                    ? 'bg-gradient-to-b from-green-500 to-emerald-600 opacity-70 cursor-not-allowed'
                    : ''
                }`}
              >
                {isShared ? '✓ Shared Today' : 'Share with Coach'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

