
import React from 'react';
import { 
  Users, 
  User, 
  Sparkles, 
  Eye, 
  Cpu, 
  Heart, 
  GanttChartSquare, 
  Shuffle 
} from 'lucide-react';

interface DichotomySliderProps {
  label: string;
  leftTrait: string;
  rightTrait: string;
  score: number; // 0 to 100, where 100 is pure rightTrait
  color: string;
}

const traitIcons: Record<string, React.ReactNode> = {
  "Introverted": <User className="w-4 h-4" />,
  "Extraverted": <Users className="w-4 h-4" />,
  "Intuitive": <Sparkles className="w-4 h-4" />,
  "Observant": <Eye className="w-4 h-4" />,
  "Thinking": <Cpu className="w-4 h-4" />,
  "Feeling": <Heart className="w-4 h-4" />,
  "Judging": <GanttChartSquare className="w-4 h-4" />,
  "Prospecting": <Shuffle className="w-4 h-4" />
};

const DichotomySlider: React.FC<DichotomySliderProps> = ({ label, leftTrait, rightTrait, score, color }) => {
  const isRightDominant = score >= 50;
  const dominantScore = isRightDominant ? score : 100 - score;
  const dominantTrait = isRightDominant ? rightTrait : leftTrait;

  return (
    <div className="group space-y-4">
      {/* Header Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 group-hover:text-indigo-400 transition-colors mb-1">
            {label}
          </p>
          <p className="text-sm font-black text-slate-900 leading-none">
            {dominantTrait}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Dominance</p>
          <p className="text-sm font-black" style={{ color }}>{dominantScore}%</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Left Icon Block */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border-2 ${!isRightDominant ? 'bg-white shadow-sm' : 'bg-slate-50 border-transparent opacity-30 grayscale'} `} 
             style={{ borderColor: !isRightDominant ? color : 'transparent' }}>
          {React.cloneElement(traitIcons[leftTrait] as React.ReactElement<any>, { 
            className: "w-5 h-5",
            style: { color: !isRightDominant ? color : '#94a3b8' } 
          })}
        </div>

        {/* Dynamic Slider Bar */}
        <div className="flex-1 h-3 bg-slate-100 rounded-full relative flex items-center shadow-inner overflow-hidden">
          {/* Neutral Center Marker */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/80 z-20 -translate-x-1/2"></div>
          
          {/* Progress Fills */}
          <div className="absolute inset-0 flex">
             {/* Left Pole Fill */}
             <div className="h-full flex-1 flex justify-end">
                <div 
                  className="h-full transition-all duration-1000 ease-out origin-right"
                  style={{ 
                    width: '100%',
                    background: !isRightDominant ? color : '#f1f5f9',
                    transform: `scaleX(${!isRightDominant ? (dominantScore - 50) / 50 : 0})`
                  }}
                ></div>
             </div>
             {/* Right Pole Fill */}
             <div className="h-full flex-1">
                <div 
                  className="h-full transition-all duration-1000 ease-out origin-left"
                  style={{ 
                    width: '100%',
                    background: isRightDominant ? color : '#f1f5f9',
                    transform: `scaleX(${isRightDominant ? (dominantScore - 50) / 50 : 0})`
                  }}
                ></div>
             </div>
          </div>

          {/* Liquid highlight effect overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-b from-white via-transparent to-black/20"></div>
          
          {/* Thumb marker (Center-relative) */}
          <div 
            className="absolute top-1/2 w-1.5 h-4 bg-white rounded-full shadow-md z-30 transition-all duration-1000 ease-out border border-slate-200 -translate-y-1/2"
            style={{ 
                left: `${score}%`,
                transform: `translate(-50%, -50%)`
            }}
          ></div>
        </div>

        {/* Right Icon Block */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border-2 ${isRightDominant ? 'bg-white shadow-sm' : 'bg-slate-50 border-transparent opacity-30 grayscale'} `}
             style={{ borderColor: isRightDominant ? color : 'transparent' }}>
          {React.cloneElement(traitIcons[rightTrait] as React.ReactElement<any>, { 
            className: "w-5 h-5",
            style: { color: isRightDominant ? color : '#94a3b8' } 
          })}
        </div>
      </div>

      {/* Trait Labels */}
      <div className="flex justify-between items-center px-1">
        <span className={`text-[10px] font-black uppercase tracking-tighter ${!isRightDominant ? 'text-slate-900' : 'text-slate-300'}`}>
          {leftTrait}
        </span>
        <span className={`text-[10px] font-black uppercase tracking-tighter ${isRightDominant ? 'text-slate-900' : 'text-slate-300'}`}>
          {rightTrait}
        </span>
      </div>
    </div>
  );
};

export default DichotomySlider;
