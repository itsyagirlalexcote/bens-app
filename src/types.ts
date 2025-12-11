export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'coach';
}

export interface DailyMetrics {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number; // in ml
  sleep: number; // in hours
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

export interface SharedData {
  clientId: string;
  clientName: string;
  date: string;
  metrics: DailyMetrics;
  sharedAt: string;
}

