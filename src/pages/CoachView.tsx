import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { SharedData } from '../types';
import Navigation from '../components/Navigation';

const CoachView = () => {
  useAuth(); // For navigation access
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
    <div className="min-h-screen bg-perf-light dark:bg-perf-dark pb-20 md:pb-24">
      <Navigation />
      
      <div className="container-responsive pt-6 sm:pt-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Coach Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2 font-medium">
            View client nutrition and health data
          </p>
        </div>
        {sharedData.length === 0 ? (
          <div className="ios-card p-8 sm:p-10 text-center">
            <p className="text-gray-600 dark:text-gray-400 font-medium">No shared data from clients yet</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 font-medium">
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
                    className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="text-left">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                        {dataForDate.length} client{dataForDate.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-xl">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-5">
                      {dataForDate.map((data, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 dark:bg-gray-800/60 rounded-ios-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700/50"
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 sm:mb-5">
                            <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                              {data.clientName}
                            </h4>
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                              Shared at{' '}
                              {new Date(data.sharedAt).toLocaleTimeString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Calories</p>
                              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                                {data.metrics.calories.toFixed(0)} kcal
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Protein</p>
                              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                                {data.metrics.protein.toFixed(1)}g
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Water</p>
                              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                                {(data.metrics.water / 1000).toFixed(1)}L
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Carbs</p>
                              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                                {data.metrics.carbs.toFixed(1)}g
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Fat</p>
                              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                                {data.metrics.fat.toFixed(1)}g
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Sleep</p>
                              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                                {data.metrics.sleep.toFixed(1)} hrs
                              </p>
                            </div>
                          </div>

                          {data.metrics.meals.length > 0 && (
                            <div>
                              <p className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Meals</p>
                              <div className="space-y-2">
                                {data.metrics.meals.map((meal) => (
                                  <div
                                    key={meal.id}
                                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-900/50 rounded-ios-lg border border-gray-200 dark:border-gray-700/50"
                                  >
                                    <div>
                                      <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                                        {meal.name}
                                      </p>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                        {meal.time}
                                      </p>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
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

