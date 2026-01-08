
import React from 'react';

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
}

const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange }) => {
  const options = [-3, -2, -1, 0, 1, 2, 3];
  
  const getSizeClass = (opt: number) => {
    const abs = Math.abs(opt);
    if (abs === 3) return "w-12 h-12 md:w-14 md:h-14";
    if (abs === 2) return "w-10 h-10 md:w-12 md:h-12";
    if (abs === 1) return "w-8 h-8 md:w-10 md:h-10";
    return "w-6 h-6 md:w-7 md:h-7";
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-xl mx-auto py-6">
      <div className="flex items-center justify-between w-full px-2">
        <span className="text-emerald-500 font-black text-[11px] md:text-[13px] tracking-[0.2em]">AGREE</span>
        <span className="text-purple-500 font-black text-[11px] md:text-[13px] tracking-[0.2em]">DISAGREE</span>
      </div>
      
      <div className="flex items-center justify-between w-full relative px-2">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -z-10 -translate-y-1/2"></div>
        
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`
              likert-btn rounded-full border-4 transition-all duration-300 flex items-center justify-center
              ${getSizeClass(opt)}
              ${opt < 0 
                ? (value === opt ? 'bg-emerald-500 border-emerald-500 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-white border-emerald-100 hover:border-emerald-300 hover:scale-105') 
                : opt > 0
                ? (value === opt ? 'bg-purple-500 border-purple-500 scale-110 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-white border-purple-100 hover:border-purple-300 hover:scale-105')
                : (value === opt ? 'bg-slate-400 border-slate-400 scale-110 shadow-lg' : 'bg-white border-slate-100 hover:border-slate-300 hover:scale-105')
              }
            `}
          >
            {value === opt && (
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full shadow-inner animate-in fade-in zoom-in duration-300"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LikertScale;
