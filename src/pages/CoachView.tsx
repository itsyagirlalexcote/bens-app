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
    <div className="min-h-screen bg-ios-lightGray pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ios-darkGray">
                Coach Dashboard
              </h1>
              <p className="text-ios-gray text-sm mt-1">
                View client nutrition and health data
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-ios-blue text-sm font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-ios-blue text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        {sharedData.length === 0 ? (
          <div className="ios-card p-8 text-center">
            <p className="text-ios-gray">No shared data from clients yet</p>
            <p className="text-ios-gray text-sm mt-2">
              Clients can share their daily data from the dashboard
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {dates.map((date) => {
              const dataForDate = groupedByDate[date];
              const isExpanded = selectedDate === date;

              return (
                <div key={date} className="ios-card overflow-hidden">
                  <button
                    onClick={() => setSelectedDate(isExpanded ? null : date)}
                    className="w-full p-6 flex items-center justify-between hover:bg-ios-lightGray transition-colors"
                  >
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </h3>
                      <p className="text-sm text-ios-gray mt-1">
                        {dataForDate.length} client{dataForDate.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span className="text-ios-gray text-xl">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6 space-y-6">
                      {dataForDate.map((data, idx) => (
                        <div
                          key={idx}
                          className="bg-ios-lightGray rounded-lg p-5"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-lg">
                              {data.clientName}
                            </h4>
                            <span className="text-xs text-ios-gray">
                              Shared at{' '}
                              {new Date(data.sharedAt).toLocaleTimeString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-ios-gray">Calories</p>
                              <p className="text-xl font-semibold">
                                {data.metrics.calories.toFixed(0)} kcal
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray">Protein</p>
                              <p className="text-xl font-semibold">
                                {data.metrics.protein.toFixed(1)}g
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray">Water</p>
                              <p className="text-xl font-semibold">
                                {(data.metrics.water / 1000).toFixed(1)}L
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray">Carbs</p>
                              <p className="text-xl font-semibold">
                                {data.metrics.carbs.toFixed(1)}g
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray">Fat</p>
                              <p className="text-xl font-semibold">
                                {data.metrics.fat.toFixed(1)}g
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-ios-gray">Sleep</p>
                              <p className="text-xl font-semibold">
                                {data.metrics.sleep.toFixed(1)} hrs
                              </p>
                            </div>
                          </div>

                          {data.metrics.meals.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Meals</p>
                              <div className="space-y-2">
                                {data.metrics.meals.map((meal) => (
                                  <div
                                    key={meal.id}
                                    className="flex items-center justify-between p-2 bg-white rounded"
                                  >
                                    <div>
                                      <p className="font-medium text-sm">
                                        {meal.name}
                                      </p>
                                      <p className="text-xs text-ios-gray">
                                        {meal.time}
                                      </p>
                                    </div>
                                    <p className="text-sm font-semibold">
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

