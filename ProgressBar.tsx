import React from 'react';

interface Props {
  current: number;
  total: number;
  active?: boolean;
}

const ProgressBar: React.FC<Props> = ({ current, total, active }) => {
  const percent = Math.min(100, Math.round((current / total) * 100));
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-2 px-1">
        <span>ВЫПОЛНЕНО</span>
        <span className={active ? 'text-emerald-500' : ''}>{percent}%</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            active ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-slate-300'
          }`} 
          style={{ width: `${percent}%` }} 
        />
      </div>
      <div className="mt-2 text-[10px] text-center text-slate-300 font-medium">
        {current} из {total} дней цикла
      </div>
    </div>
  );
};

export default ProgressBar;