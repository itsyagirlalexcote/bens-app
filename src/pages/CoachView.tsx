import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { SharedData } from '../types';

const CoachView = () => {
  const { logout } = useAuth();
  const [sharedData, setSharedData] = useState<SharedData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const data = storage.getSharedData();
    // Sort by date, most recent first
    const sorted = data.sort((a, b) => 
      new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime()
    );
    setSharedData(sorted);
  }, []);

  const groupedByDate = sharedData.reduce((acc, data) => {
    if (!acc[data.date]) {
      acc[data.date] = [];
    }
    acc[data.date].push(data);
    return acc;
  }, {} as Record<string, SharedData[]>);

  const dates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="min-h-screen bg-ios-lightGray pb-24">
      <div className="ios-header sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ios-darkGray tracking-tight">
                Coach Dashboard
              </h1>
              <p className="text-ios-gray text-sm mt-1.5 font-medium">
                View client nutrition and health data
              </p>
            </div>
            <div className="flex items-center gap-5">
              <Link
                to="/dashboard"
                className="text-ios-blue text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                Dashboard
              </Link>
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

      <div className="max-w-6xl mx-auto px-5 mt-6">
        {sharedData.length === 0 ? (
          <div className="ios-card p-10 text-center">
            <p className="text-ios-gray font-medium">No shared data from clients yet</p>
            <p className="text-ios-gray text-sm mt-2 font-medium">
              Clients can share their daily data from the dashboard
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {dates.map((date) => {
              const dataForDate = groupedByDate[date];
              const isExpanded = selectedDate === date;

              return (
                <div key={date} className="ios-card overflow-hidden">
                  <button
                    onClick={() => setSelectedDate(isExpanded ? null : date)}
                    className="w-full p-6 flex items-center justify-between hover:bg-ios-lightGray/50 transition-colors"
                  >
                    <div className="text-left">
                      <h3 className="font-bold text-lg text-ios-darkGray">
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </h3>
                      <p className="text-sm text-ios-gray mt-1 font-medium">
                        {dataForDate.length} client{dataForDate.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span className="text-ios-gray text-xl">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-200/50 p-6 space-y-5">
                      {dataForDate.map((data, idx) => (
                        <div
                          key={idx}
                          className="bg-ios-lightGray/60 rounded-ios-lg p-6 border border-gray-100/50"
                        >
                          <div className="flex items-center justify-between mb-5">
                            <h4 className="font-bold text-lg text-ios-darkGray">
                              {data.clientName}
                            </h4>
                            <span className="text-xs text-ios-gray font-medium">
                              Shared at{' '}
                              {new Date(data.sharedAt).toLocaleTimeString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-5">
                            <div>
                              <p className="text-sm text-ios-gray font-medium mb-1">Calories</p>
                              <p className="text-xl font-bold text-ios-darkGray">
                                {data.metrics.calories.toFixed(0)} kcal
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray font-medium mb-1">Protein</p>
                              <p className="text-xl font-bold text-ios-darkGray">
                                {data.metrics.protein.toFixed(1)}g
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray font-medium mb-1">Water</p>
                              <p className="text-xl font-bold text-ios-darkGray">
                                {(data.metrics.water / 1000).toFixed(1)}L
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray font-medium mb-1">Carbs</p>
                              <p className="text-xl font-bold text-ios-darkGray">
                                {data.metrics.carbs.toFixed(1)}g
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray font-medium mb-1">Fat</p>
                              <p className="text-xl font-bold text-ios-darkGray">
                                {data.metrics.fat.toFixed(1)}g
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray font-medium mb-1">Sleep</p>
                              <p className="text-xl font-bold text-ios-darkGray">
                                {data.metrics.sleep.toFixed(1)} hrs
                              </p>
                            </div>
                          </div>

                          {data.metrics.meals.length > 0 && (
                            <div>
                              <p className="text-sm font-semibold mb-3 text-ios-darkGray">Meals</p>
                              <div className="space-y-2">
                                {data.metrics.meals.map((meal) => (
                                  <div
                                    key={meal.id}
                                    className="flex items-center justify-between p-3 bg-white/80 rounded-ios-lg border border-gray-100/50"
                                  >
                                    <div>
                                      <p className="font-semibold text-sm text-ios-darkGray">
                                        {meal.name}
                                      </p>
                                      <p className="text-xs text-ios-gray mt-0.5">
                                        {meal.time}
                                      </p>
                                    </div>
                                    <p className="text-sm font-bold text-ios-darkGray">
                                      {meal.calories} kcal
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachView;

