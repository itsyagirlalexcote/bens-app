import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { MacroGoals } from '../types';

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
    <div className="min-h-screen bg-ios-lightGray pb-24">
      <div className="ios-header sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-ios-darkGray tracking-tight">Profile</h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-ios-gray text-sm font-semibold hover:text-ios-darkGray transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 mt-6">
        <div className="ios-card p-6 mb-6">
          <div>
            <h2 className="text-lg font-bold mb-2 text-ios-darkGray">User Information</h2>
            <p className="text-sm text-ios-gray font-medium">{user?.email}</p>
          </div>
        </div>

        <div className="ios-card p-6 mb-6">
          <h2 className="text-lg font-bold mb-2 text-ios-darkGray">Daily Macro Goals</h2>
          <p className="text-sm text-ios-gray mb-6 font-medium">
            Set your daily targets for calories and macronutrients
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
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

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
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
                <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
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
                <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
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

        <div className="ios-card p-6 mb-6">
          <h2 className="text-lg font-bold mb-2 text-ios-darkGray">Health Goals</h2>
          <p className="text-sm text-ios-gray mb-6 font-medium">
            Set your daily targets for hydration and sleep
          </p>

          <div className="grid grid-cols-2 gap-4">
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
              <p className="text-xs text-ios-gray mt-2 font-medium">
                {(goals.water / 1000).toFixed(1)} liters
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
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

        <button onClick={handleSave} className="ios-button w-full">
          Save Goals
        </button>
      </div>
    </div>
  );
};

export default Profile;

