import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { DailyMetrics, Meal } from '../types';

const TrackData = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [showMealForm, setShowMealForm] = useState(false);
  const [mealName, setMealName] = useState('');
  const [mealCalories, setMealCalories] = useState('');
  const [mealProtein, setMealProtein] = useState('');
  const [mealCarbs, setMealCarbs] = useState('');
  const [mealFat, setMealFat] = useState('');
  const [mealTime, setMealTime] = useState('');

  useEffect(() => {
    const existing = storage.getMetrics(today);
    if (existing) {
      setCalories(existing.calories);
      setProtein(existing.protein);
      setCarbs(existing.carbs);
      setFat(existing.fat);
      setWater(existing.water);
      setSleep(existing.sleep);
      setMeals(existing.meals);
    }
  }, [today]);

  const handleSave = () => {
    const metrics: DailyMetrics = {
      date: today,
      calories,
      protein,
      carbs,
      fat,
      water,
      sleep,
      meals,
    };

    storage.saveMetrics(metrics);
    navigate('/dashboard');
  };

  const handleAddMeal = () => {
    if (!mealName || !mealCalories) return;

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: mealName,
      calories: parseFloat(mealCalories) || 0,
      protein: parseFloat(mealProtein) || 0,
      carbs: parseFloat(mealCarbs) || 0,
      fat: parseFloat(mealFat) || 0,
      time: mealTime || new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };

    setMeals([...meals, newMeal]);
    setCalories(calories + newMeal.calories);
    setProtein(protein + newMeal.protein);
    setCarbs(carbs + newMeal.carbs);
    setFat(fat + newMeal.fat);
    
    // Reset form
    setMealName('');
    setMealCalories('');
    setMealProtein('');
    setMealCarbs('');
    setMealFat('');
    setMealTime('');
    setShowMealForm(false);
  };

  const handleDeleteMeal = (id: string) => {
    const meal = meals.find(m => m.id === id);
    if (meal) {
      setCalories(calories - meal.calories);
      setProtein(protein - meal.protein);
      setCarbs(carbs - meal.carbs);
      setFat(fat - meal.fat);
    }
    setMeals(meals.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-ios-lightGray pb-24">
      <div className="ios-header sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-ios-darkGray tracking-tight">Track Your Data</h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-ios-gray text-sm font-semibold hover:text-ios-darkGray transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 mt-6 space-y-6">
        {/* Nutrition */}
        <div className="ios-card p-6">
          <h2 className="text-lg font-bold mb-5 text-ios-darkGray">Nutrition</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
                Calories (kcal)
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(parseFloat(e.target.value) || 0)}
                className="ios-input"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
                  Protein (g)
                </label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(parseFloat(e.target.value) || 0)}
                  className="ios-input"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(parseFloat(e.target.value) || 0)}
                  className="ios-input"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
                  Fat (g)
                </label>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(parseFloat(e.target.value) || 0)}
                  className="ios-input"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="ios-card p-6">
          <h2 className="text-lg font-bold mb-5 text-ios-darkGray">Health Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
                Water (ml)
              </label>
              <input
                type="number"
                value={water}
                onChange={(e) => setWater(parseFloat(e.target.value) || 0)}
                className="ios-input"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ios-darkGray mb-2.5">
                Sleep (hours)
              </label>
              <input
                type="number"
                step="0.5"
                value={sleep}
                onChange={(e) => setSleep(parseFloat(e.target.value) || 0)}
                className="ios-input"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Meals */}
        <div className="ios-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-ios-darkGray">Meals</h2>
            <button
              onClick={() => setShowMealForm(!showMealForm)}
              className="text-ios-blue text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              {showMealForm ? 'Cancel' : '+ Add Meal'}
            </button>
          </div>

          {showMealForm && (
            <div className="bg-ios-lightGray/60 p-5 rounded-ios-lg mb-5 space-y-4 border border-gray-100/50">
              <input
                type="text"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="ios-input"
                placeholder="Meal name"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={mealCalories}
                  onChange={(e) => setMealCalories(e.target.value)}
                  className="ios-input"
                  placeholder="Calories"
                />
                <input
                  type="time"
                  value={mealTime}
                  onChange={(e) => setMealTime(e.target.value)}
                  className="ios-input"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  value={mealProtein}
                  onChange={(e) => setMealProtein(e.target.value)}
                  className="ios-input"
                  placeholder="Protein (g)"
                />
                <input
                  type="number"
                  value={mealCarbs}
                  onChange={(e) => setMealCarbs(e.target.value)}
                  className="ios-input"
                  placeholder="Carbs (g)"
                />
                <input
                  type="number"
                  value={mealFat}
                  onChange={(e) => setMealFat(e.target.value)}
                  className="ios-input"
                  placeholder="Fat (g)"
                />
              </div>
              <button onClick={handleAddMeal} className="ios-button w-full">
                Add Meal
              </button>
            </div>
          )}

          <div className="space-y-2.5">
            {meals.length === 0 ? (
              <p className="text-ios-gray text-sm font-medium">No meals added yet</p>
            ) : (
              meals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between p-4 bg-ios-lightGray/60 rounded-ios-lg border border-gray-100/50"
                >
                  <div>
                    <p className="font-semibold text-ios-darkGray">{meal.name}</p>
                    <p className="text-sm text-ios-gray mt-0.5">{meal.time}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-ios-darkGray">{meal.calories} kcal</p>
                      <p className="text-xs text-ios-gray mt-0.5">
                        P: {meal.protein}g C: {meal.carbs}g F: {meal.fat}g
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteMeal(meal.id)}
                      className="text-red-500 text-sm font-semibold hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button onClick={handleSave} className="ios-button w-full">
          Save Data
        </button>
      </div>
    </div>
  );
};

export default TrackData;

