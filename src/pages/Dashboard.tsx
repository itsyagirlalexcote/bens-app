import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { DailyMetrics, MacroGoals } from '../types';
import Navigation from '../components/Navigation';

const Dashboard = () => {
  const { user } = useAuth();
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
      <div className="ios-card p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium tracking-wide uppercase">{title}</span>
          <span className="text-2xl sm:text-3xl">{icon}</span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {value.toFixed(1)}
          <span className="text-base sm:text-lg text-gray-500 dark:text-gray-400 ml-1.5 font-medium">{unit}</span>
        </div>
        {goal && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-medium">Goal: {goal.toFixed(0)}{unit}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{percentage?.toFixed(0)}%</span>
            </div>
            <div className="ios-progress-bar">
              <div
                className={`ios-progress-fill ${
                  (percentage || 0) >= 100
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : (percentage || 0) >= 75
                    ? 'bg-gradient-to-r from-perf-primary to-perf-secondary'
                    : 'bg-gradient-to-r from-perf-accent to-orange-500'
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
    <div className="min-h-screen bg-perf-light dark:bg-perf-dark pb-20 md:pb-24">
      <Navigation />
      
      <div className="container-main pt-6 sm:pt-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2 font-medium">{getTodayDate()}</p>
        </div>

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
          <div className="ios-card p-8 sm:p-10 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-base">No data tracked for today</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
              <div className="ios-card p-4 sm:p-5 mb-6 bg-gradient-to-br from-perf-primary/10 to-perf-secondary/10 dark:from-perf-primary/20 dark:to-perf-secondary/20 border border-perf-primary/20 dark:border-perf-primary/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      Set your macro goals to track progress
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Go to Profile to configure your daily targets
                    </p>
                  </div>
                  <Link to="/profile" className="ios-button text-sm px-5 py-2.5 whitespace-nowrap">
                    Set Goals
                  </Link>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mb-6">
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

            <div className="ios-card p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-bold mb-4 sm:mb-5 text-gray-900 dark:text-gray-100">Today's Meals</h2>
              {todayMetrics.meals.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-sm">No meals logged yet</p>
              ) : (
                <div className="space-y-2.5">
                  {todayMetrics.meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-ios-lg border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{meal.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{meal.time}</p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className="font-bold text-gray-900 dark:text-gray-100">{meal.calories} kcal</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          P: {meal.protein}g C: {meal.carbs}g F: {meal.fat}g
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-20 md:mb-0">
              <Link to="/track" className="ios-button flex-1 text-center">
                Update Data
              </Link>
              <button
                onClick={handleShare}
                disabled={isShared}
                className={`ios-button flex-1 ${
                  isShared
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 opacity-70 cursor-not-allowed'
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

