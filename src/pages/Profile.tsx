import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { MacroGoals } from '../types';
import Navigation from '../components/Navigation';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState<MacroGoals>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65,
    water: 2000,
    sleep: 8,
  });

  useEffect(() => {
    const savedGoals = storage.getMacroGoals();
    if (savedGoals) {
      setGoals(savedGoals);
    }
  }, []);

  const handleSave = () => {
    storage.saveMacroGoals(goals);
    navigate('/dashboard');
  };

  const handleChange = (field: keyof MacroGoals, value: string) => {
    const numValue = parseFloat(value) || 0;
    setGoals((prev) => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="min-h-screen bg-perf-light dark:bg-perf-dark pb-20 md:pb-24">
      <Navigation />
      
      <div className="container-main pt-6 sm:pt-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Profile</h1>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="ios-card p-4 sm:p-6">
            <div>
              <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">User Information</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{user?.email}</p>
            </div>
          </div>

          <div className="ios-card p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Daily Macro Goals</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 font-medium">
            Set your daily targets for calories and macronutrients
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                Calories (kcal)
              </label>
              <input
                type="number"
                value={goals.calories}
                onChange={(e) => handleChange('calories', e.target.value)}
                className="ios-input"
                placeholder="2000"
              />
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                  Protein (g)
                </label>
                <input
                  type="number"
                  value={goals.protein}
                  onChange={(e) => handleChange('protein', e.target.value)}
                  className="ios-input"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  value={goals.carbs}
                  onChange={(e) => handleChange('carbs', e.target.value)}
                  className="ios-input"
                  placeholder="200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                  Fat (g)
                </label>
                <input
                  type="number"
                  value={goals.fat}
                  onChange={(e) => handleChange('fat', e.target.value)}
                  className="ios-input"
                  placeholder="65"
                />
              </div>
            </div>
          </div>
        </div>

          <div className="ios-card p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Health Goals</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 font-medium">
              Set your daily targets for hydration and sleep
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
                Water (ml)
              </label>
              <input
                type="number"
                value={goals.water}
                onChange={(e) => handleChange('water', e.target.value)}
                className="ios-input"
                placeholder="2000"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">
                {(goals.water / 1000).toFixed(1)} liters
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2.5">
                Sleep (hours)
              </label>
              <input
                type="number"
                step="0.5"
                value={goals.sleep}
                onChange={(e) => handleChange('sleep', e.target.value)}
                className="ios-input"
                placeholder="8"
              />
            </div>
            </div>
          </div>

          <button onClick={handleSave} className="ios-button w-full mb-20 md:mb-0">
            Save Goals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

