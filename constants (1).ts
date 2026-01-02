import { Practice } from './types';

// Текущий период: 15.12.2025 - 15.02.2026
export const CYCLE_DURATION_DAYS = 63;
export const CYCLE_START_DATE = '2025-12-15T00:00:00Z';

export const INITIAL_PRACTICES: Practice[] = [
  {
    id: 'ca',
    name: 'Кальций (Ca)',
    category: 'Minerals',
    type: 'continuous',
    totalDays: 63,
    completedDays: []
  },
  {
    id: 'ma',
    name: 'Магний (Ma)',
    category: 'Minerals',
    type: 'continuous',
    totalDays: 63,
    completedDays: []
  },
  {
    id: 'vit-d3',
    name: 'Витамин D3',
    category: 'Vitamins',
    type: 'continuous',
    totalDays: 63,
    completedDays: []
  },
  {
    id: 'vit-c',
    name: 'Витамин C',
    category: 'Vitamins',
    type: 'continuous',
    totalDays: 63,
    completedDays: []
  },
  {
    id: 'glucosamine',
    name: 'Glucosamine Chondroitin MSM',
    category: 'Supplements',
    type: 'continuous',
    totalDays: 63,
    completedDays: []
  },
  {
    id: 'sea-buckthorn-oil',
    name: 'Масло облепихи (утром натощак)',
    category: 'Supplements',
    type: 'continuous',
    totalDays: 63,
    completedDays: []
  },
  {
    id: 'spine-clearing',
    name: 'Очищение позвоночника',
    category: 'Meditation',
    type: 'continuous',
    totalDays: 63,
    completedDays: []
  },
  {
    id: 'gymnastics-period-2',
    name: 'Комплекс упражнений 2-го периода',
    category: 'Gymnastics',
    type: 'continuous',
    totalDays: 63,
    completedDays: []
  },
  {
    id: 'emotions-practice',
    name: 'Проработка отвращения и принятия',
    category: 'Meditation',
    type: 'limited',
    totalDays: 42,
    completedDays: []
  },
  {
    id: 'sexual-energy',
    name: 'Подъем сексуальной энергии',
    category: 'Meditation',
    type: 'limited',
    totalDays: 42,
    completedDays: []
  }
];