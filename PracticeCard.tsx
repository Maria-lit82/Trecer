import React from 'react';
import { Practice } from '../types';
import ProgressBar from './ProgressBar';

interface Props {
  practice: Practice;
  isTodayDone: boolean;
  onToggle: (id: string) => void;
}

const PracticeCard: React.FC<Props> = ({ practice, isTodayDone, onToggle }) => {
  return (
    <div className={`group relative bg-white p-5 rounded-[2rem] transition-all duration-300 border ${isTodayDone ? 'border-emerald-100 shadow-sm' : 'border-slate-100 shadow-none'}`}>
      <div className="flex justify-between items-start gap-4 mb-5">
        <div className="flex-1">
          <h3 className={`font-bold text-lg leading-tight transition-colors ${isTodayDone ? 'text-emerald-700' : 'text-slate-700'}`}>
            {practice.name}
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-bold">
            {practice.type === 'continuous' ? 'Ежедневно' : `Курс: ${practice.totalDays} дн.`}
          </p>
        </div>
        
        <button 
          onClick={() => onToggle(practice.id)}
          className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 transform active:scale-90 ${
            isTodayDone 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 rotate-0' 
              : 'bg-slate-50 text-slate-300 hover:bg-slate-100 rotate-3'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
      
      <ProgressBar current={practice.completedDays.length} total={practice.totalDays} active={isTodayDone} />
    </div>
  );
};

export default PracticeCard;
