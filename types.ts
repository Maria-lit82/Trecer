export type Category = 'Vitamins' | 'Minerals' | 'Supplements' | 'Meditation' | 'Affirmations' | 'Gymnastics';

export interface Practice {
  id: string;
  name: string;
  category: Category;
  type: 'continuous' | 'limited';
  totalDays: number;
  completedDays: string[]; // Dates in YYYY-MM-DD format
}

export interface UserProgress {
  cycleStartDate: string; // ISO String
  practices: Practice[];
}