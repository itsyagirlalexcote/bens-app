import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { DailyMetrics } from '../types';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [todayMetrics, setTodayMetrics] = useState<DailyMetrics | null>(null);
  const [isShared, setIsShared] = useState(false);

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

  const MetricCard = ({ title, value, unit, icon }: {
    title: string;
    value: number;
    unit: string;
    icon: string;
  }) => (
    <div className="ios-card p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-ios-gray text-sm">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-2xl font-semibold text-ios-darkGray">
        {value.toFixed(1)}
        <span className="text-base text-ios-gray ml-1">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ios-lightGray pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ios-darkGray">
                Welcome back, {user?.name}
              </h1>
              <p className="text-ios-gray text-sm mt-1">{getTodayDate()}</p>
            </div>
            <button
              onClick={logout}
              className="text-ios-blue text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {user?.role === 'coach' && (
        <div className="max-w-4xl mx-auto px-4 mt-4">
          <Link
            to="/coach"
            className="ios-card p-4 block hover:bg-ios-lightGray transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">View Client Data</h3>
                <p className="text-sm text-ios-gray">Access coach dashboard</p>
              </div>
              <span className="text-ios-blue">→</span>
            </div>
          </Link>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 mt-6">
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
          <div className="ios-card p-8 text-center">
            <p className="text-ios-gray mb-4">No data tracked for today</p>
            <Link to="/track" className="ios-button inline-block">
              Start Tracking
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <MetricCard
                title="Calories"
                value={todayMetrics.calories}
                unit="kcal"
                icon="🔥"
              />
              <MetricCard
                title="Protein"
                value={todayMetrics.protein}
                unit="g"
                icon="🥩"
              />
              <MetricCard
                title="Carbs"
                value={todayMetrics.carbs}
                unit="g"
                icon="🍞"
              />
              <MetricCard
                title="Fat"
                value={todayMetrics.fat}
                unit="g"
                icon="🥑"
              />
              <MetricCard
                title="Water"
                value={todayMetrics.water / 1000}
                unit="L"
                icon="💧"
              />
              <MetricCard
                title="Sleep"
                value={todayMetrics.sleep}
                unit="hrs"
                icon="😴"
              />
            </div>

            <div className="ios-card p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Today's Meals</h2>
              {todayMetrics.meals.length === 0 ? (
                <p className="text-ios-gray text-sm">No meals logged yet</p>
              ) : (
                <div className="space-y-3">
                  {todayMetrics.meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="flex items-center justify-between p-3 bg-ios-lightGray rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-sm text-ios-gray">{meal.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{meal.calories} kcal</p>
                        <p className="text-xs text-ios-gray">
                          P: {meal.protein}g C: {meal.carbs}g F: {meal.fat}g
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Link to="/track" className="ios-button flex-1 text-center">
                Update Data
              </Link>
              <button
                onClick={handleShare}
                disabled={isShared}
                className={`ios-button flex-1 ${
                  isShared
                    ? 'bg-green-500 opacity-60 cursor-not-allowed'
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

