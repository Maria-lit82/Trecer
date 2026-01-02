
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { UserProgress, Category } from './types';
import { INITIAL_PRACTICES, CYCLE_START_DATE } from './constants';
import { getMotivationalPhrase } from './geminiService';
import PracticeCard from './PracticeCard';

declare const confetti: any;

const CATEGORY_NAMES: Record<Category, string> = {
  Vitamins: '💊 Витамины',
  Minerals: '💎 Минералы',
  Supplements: '🌿 Добавки',
  Meditation: '🧘 Практики и медитации',
  Affirmations: '✨ Аффирмации',
  Gymnastics: '🤸 Гимнастика'
};

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('zen_tracker_v1');
    return saved ? JSON.parse(saved) : { cycleStartDate: CYCLE_START_DATE, practices: INITIAL_PRACTICES };
  });

  const [motivation, setMotivation] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // Используем локальную дату без смещения часовых поясов
  const today = new Date().toLocaleDateString('en-CA'); 

  useEffect(() => {
    localStorage.setItem('zen_tracker_v1', JSON.stringify(progress));
  }, [progress]);

  const triggerCelebration = useCallback(() => {
    if (typeof confetti === 'function') {
      confetti({ 
        particleCount: 100, 
        spread: 70, 
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      });
    }
  }, []);

  const handleToggle = async (id: string) => {
    const practice = progress.practices.find(p => p.id === id);
    if (!practice) return;

    const isDone = practice.completedDays.includes(today);
    const newPractices = progress.practices.map(p => {
      if (p.id === id) {
        return {
          ...p,
          completedDays: isDone ? p.completedDays.filter(d => d !== today) : [...p.completedDays, today]
        };
      }
      return p;
    });

    setProgress(prev => ({ ...prev, practices: newPractices }));

    if (!isDone) {
      triggerCelebration();
      setLoading(true);
      setShowToast(true);
      const phrase = await getMotivationalPhrase(practice.name);
      setMotivation(phrase);
      setLoading(false);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  const groupedPractices = useMemo(() => {
    const groups: Partial<Record<Category, typeof INITIAL_PRACTICES>> = {};
    progress.practices.forEach(p => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category]!.push(p);
    });
    return groups;
  }, [progress.practices]);

  return (
    <div className="min-h-screen bg-[#fdfcfb] pb-32">
      <header className="bg-white border-b border-orange-100 px-6 py-8 text-center sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Zen Tracker</h1>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Период: Зима 25/26</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-8">
        {(Object.keys(groupedPractices) as Category[]).map(cat => (
          <section key={cat} className="space-y-3">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">
              {CATEGORY_NAMES[cat]}
            </h2>
            <div className="space-y-3">
              {groupedPractices[cat]?.map(p => (
                <PracticeCard 
                  key={p.id} 
                  practice={p} 
                  isTodayDone={p.completedDays.includes(today)} 
                  onToggle={handleToggle} 
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {showToast && (
        <div className="fixed inset-x-4 bottom-8 flex justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white flex flex-col items-center text-center gap-2 animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500 max-w-sm w-full">
            <div className="text-2xl mb-1">{loading ? '⏳' : '✨'}</div>
            <p className="text-base font-semibold text-slate-800 leading-snug">
              {loading ? 'Настраиваемся на успех...' : motivation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
