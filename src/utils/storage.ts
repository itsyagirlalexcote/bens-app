import { User, DailyMetrics, SharedData } from '../types';

const STORAGE_KEYS = {
  USER: 'nutrition_user',
  METRICS: 'nutrition_metrics',
  SHARED_DATA: 'nutrition_shared_data',
};

export const storage = {
  // User management
  getUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  clearUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Metrics management
  getMetrics: (date: string): DailyMetrics | null => {
    const allMetrics = storage.getAllMetrics();
    return allMetrics[date] || null;
  },

  getAllMetrics: (): Record<string, DailyMetrics> => {
    const metrics = localStorage.getItem(STORAGE_KEYS.METRICS);
    return metrics ? JSON.parse(metrics) : {};
  },

  saveMetrics: (metrics: DailyMetrics): void => {
    const allMetrics = storage.getAllMetrics();
    allMetrics[metrics.date] = metrics;
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(allMetrics));
  },

  // Shared data management
  getSharedData: (): SharedData[] => {
    const shared = localStorage.getItem(STORAGE_KEYS.SHARED_DATA);
    return shared ? JSON.parse(shared) : [];
  },

  addSharedData: (data: SharedData): void => {
    const shared = storage.getSharedData();
    shared.push(data);
    localStorage.setItem(STORAGE_KEYS.SHARED_DATA, JSON.stringify(shared));
  },
};

