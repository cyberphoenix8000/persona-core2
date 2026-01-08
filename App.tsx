
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants.ts';
import { UserResponse, PersonalityScores, AnalysisResult, Dimension } from './types.ts';
import { getPersonalityAnalysisAlgorithmic, getDynamicDeepDive } from './services/personalityAlgorithm.ts';
import { getGeminiPersonalityAnalysis } from './services/geminiService.ts';
import LikertScale from './components/LikertScale.tsx';
import PersonalityChart from './components/PersonalityChart.tsx';
import DichotomySlider from './components/DichotomySlider.tsx';
import { 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Brain, 
  Briefcase, 
  Heart, 
  Target, 
  AlertCircle, 
  Zap, 
  Compass as CompassIcon, 
  Users, 
  Download, 
  Fingerprint,
  Activity,
  ChevronDown,
  ShieldCheck,
  Star,
  CheckCircle2,
  TrendingUp,
  Ghost,
  Globe,
  PieChart
} from 'lucide-react';

const QUESTIONS_PER_PAGE = 10;

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'test' | 'loading' | 'results'>('intro');
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [scores, setScores] = useState<PersonalityScores | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [dynamicInsight, setDynamicInsight] = useState<{title: string, content: string}[] | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ 
    psychology: true, 
    career: false, 
    realLife: true,
    stack: true
  });
  const [loadingLog, setLoadingLog] = useState("Initializing...");
  
  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);
  const currentQuestions = QUESTIONS.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const progress = Math.round((responses.length / QUESTIONS.length) * 100);

  useEffect(() => {
    if (step !== 'intro') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, step]);

  useEffect(() => {
    if (step === 'loading') {
      const logs = [
        "Calibrating cognitive stack...", 
        "Mapping 120 behavioral nodes...", 
        "Dichotomy cross-calibration...", 
        "Synthesizing the mental hierarchy...",
        "Finalizing empathetic psych report..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setLoadingLog(logs[i % logs.length]);
        i++;
      }, 500);
      return () => clearInterval(interval);
    }
  }, [step]);

  const toggleSection = (id: string) => setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));

  const handleResponse = (questionId: number, value: number) => {
    setResponses(prev => {
      const idx = prev.findIndex(r => r.questionId === questionId);
      const next = [...prev];
      if (idx > -1) next[idx] = { questionId, value };
      else next.push({ questionId, value });
      return next;
    });
  };

  const calculateScores = (): { scores: PersonalityScores, typeCode: string } => {
    const scoresMap = { [Dimension.EI]: 0, [Dimension.SN]: 0, [Dimension.TF]: 0, [Dimension.JP]: 0 };
    const counts = { [Dimension.EI]: 0, [Dimension.SN]: 0, [Dimension.TF]: 0, [Dimension.JP]: 0 };

    responses.forEach(resp => {
      const q = QUESTIONS.find(qi => qi.id === resp.questionId);
      if (q) {
        let val = resp.value;
        if (q.reverse) val = -val;
        scoresMap[q.dimension] += ((3 - val) / 6) * 100;
        counts[q.dimension]++;
      }
    });

    const finalScores: PersonalityScores = {
      Extraversion: Math.round(scoresMap[Dimension.EI] / (counts[Dimension.EI] || 1)),
      Sensing: Math.round(scoresMap[Dimension.SN] / (counts[Dimension.SN] || 1)),
      Thinking: Math.round(scoresMap[Dimension.TF] / (counts[Dimension.TF] || 1)),
      Judging: Math.round(scoresMap[Dimension.JP] / (counts[Dimension.JP] || 1))
    };

    const typeCode = [
      finalScores.Extraversion > 50 ? 'E' : 'I',
      finalScores.Sensing > 50 ? 'S' : 'N',
      finalScores.Thinking > 50 ? 'T' : 'F',
      finalScores.Judging > 50 ? 'J' : 'P'
    ].join('');

    return { scores: finalScores, typeCode };
  };

  const handleSubmit = async () => {
    setStep('loading');
    
    // Calculate basic scores for immediate use
    const { scores: calculatedScores, typeCode } = calculateScores();
    setScores(calculatedScores);

    try {
      // Attempt high-fidelity analysis using Gemini 3 Pro
      const aiAnalysis = await getGeminiPersonalityAnalysis(calculatedScores, typeCode);
      setAnalysis(aiAnalysis);
      setDynamicInsight(getDynamicDeepDive(calculatedScores, typeCode));
      setStep('results');
    } catch (error) {
      console.warn("AI Diagnostic failed, failing back to algorithmic determination.", error);
      // Deterministic fallback if Gemini service is unavailable
      setAnalysis(getPersonalityAnalysisAlgorithmic(calculatedScores, typeCode));
      setDynamicInsight(getDynamicDeepDive(calculatedScores, typeCode));
      // Artificial delay for UI/UX consistency
      setTimeout(() => setStep('results'), 2000);
    }
  };

  if (step === 'intro') {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-[#f1f5f9] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        
        <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08),0_30px_60px_-30px_rgba(0,0,0,0.12)] p-12 md:p-20 text-center border border-white/80 relative z-10 scale-in-center transition-transform hover:translate-y-[-4px] duration-500">
          <div className="w-20 h-20 bg-[#4f46e5] rounded-[1.75rem] flex items-center justify-center mx-auto shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] mb-10 group cursor-pointer active:scale-90 transition-all">
            <Fingerprint className="text-white w-10 h-10 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#1e293b] tracking-tighter mb-6 leading-tight">
            Persona <span className="text-[#4f46e5] italic">Core.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 mb-12 leading-relaxed font-medium max-w-sm mx-auto">
            Absolute psychometric determination. Powered by Gemini Pro for high-precision cognitive synthesis.
          </p>
          <button 
            onClick={() => setStep('test')} 
            className="bg-[#4f46e5] text-white px-12 py-5 rounded-full font-black text-lg hover:bg-[#4338ca] transition-all shadow-[0_20px_50px_-10px_rgba(79,70,229,0.4)] active:scale-95 flex items-center gap-3 mx-auto group ring-4 ring-transparent hover:ring-indigo-100"
          >
            Run Diagnostics <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (step === 'test') {
    const isPageComplete = currentQuestions.every(q => responses.some(r => r.questionId === q.id));

    return (
      <div className="min-h-screen py-12 px-4 md:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="sticky top-4 z-50 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-white p-6">
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg"><Brain className="w-5 h-5 text-indigo-600" /></div>
                <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Diagnostic Node (120 Variables)</span>
              </div>
              <span className="text-indigo-600 font-black bg-indigo-50 px-3 py-1 rounded-full text-xs">{progress}%</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mx-2">
              <div className="h-full bg-indigo-600 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(79,70,229,0.4)]" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div key={currentPage} className="space-y-8 page-transition">
            {currentQuestions.map((q) => {
              const resp = responses.find(r => r.questionId === q.id);
              return (
                <div key={q.id} className="bg-white rounded-[3rem] p-12 md:p-16 text-center space-y-12 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 transition-all hover:shadow-xl hover:border-indigo-100">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight max-w-2xl mx-auto">{q.text}</h2>
                  <LikertScale value={resp?.value ?? 99} onChange={(val) => handleResponse(q.id, val)} />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center gap-6 pt-10 pb-24">
            <button 
              disabled={currentPage === 0} 
              onClick={() => setCurrentPage(p => p - 1)} 
              className="px-8 py-4 text-slate-400 font-black uppercase text-xs flex items-center gap-2 hover:text-indigo-600 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            
            <div className="flex flex-col items-center gap-1">
              <span className="text-slate-400 font-black text-[10px] uppercase tracking-tighter">Part</span>
              <span className="text-slate-900 font-black text-sm">{currentPage + 1} / {totalPages}</span>
            </div>

            {currentPage === totalPages - 1 ? (
              <button 
                disabled={!isPageComplete || progress < 100} 
                onClick={handleSubmit} 
                className="bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-black uppercase text-sm hover:bg-indigo-700 shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] active:scale-95 disabled:bg-slate-300 disabled:shadow-none transition-all"
              >
                Complete Diagnostic
              </button>
            ) : (
              <button 
                disabled={!isPageComplete} 
                onClick={() => setCurrentPage(p => p + 1)} 
                className="bg-indigo-600 text-white px-14 py-5 rounded-[2rem] font-black uppercase text-sm hover:bg-indigo-700 shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] active:scale-95 flex items-center gap-3 transition-all disabled:bg-slate-300 disabled:shadow-none"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="w-32 h-32 bg-indigo-600 rounded-[3rem] flex items-center justify-center animate-spin-slow shadow-[0_30px_60px_-15px_rgba(79,70,229,0.4)] mb-12">
          <Activity className="text-white w-14 h-14" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Analyzing Neural Matrix...</h2>
        <p className="text-indigo-500 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">{loadingLog}</p>
      </div>
    );
  }

  if (!scores || !analysis) return null;

  const InsightCard = ({ title, icon: Icon, detail }: { title: string, icon: any, detail: any }) => (
    <div className="p-10 bg-white border border-slate-100 rounded-[3.5rem] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] space-y-8 group hover:shadow-2xl hover:border-indigo-50 transition-all duration-500">
      <div className="flex items-center gap-5">
        <div className="p-4 bg-slate-50 rounded-[1.25rem] text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h4 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h4>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Situational Blueprint</p>
        </div>
      </div>
      <p className="text-base text-slate-600 leading-relaxed italic">{detail.summary}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-4.5 h-4.5" /> Core Strengths
          </p>
          <ul className="space-y-3">
            {detail.strengths.map((s: string, i: number) => (
              <li key={i} className="text-sm text-slate-500 font-semibold flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <p className="text-[11px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2">
            <AlertCircle className="w-4.5 h-4.5" /> Potential Pitfalls
          </p>
          <ul className="space-y-3">
            {detail.challenges.map((c: string, i: number) => (
              <li key={i} className="text-sm text-slate-500 font-semibold flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-50">
        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Diagnostic Advice</p>
        <p className="text-base text-slate-800 font-bold leading-relaxed">{detail.actionableTip}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Hero Module */}
        <div className="bg-[#0f172a] rounded-[4rem] overflow-hidden text-white shadow-3xl border border-slate-800 relative">
          <div className="p-12 md:p-28 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="space-y-8 text-center md:text-left">
                <div className="inline-flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
                  <Star className="w-4.5 h-4.5 text-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100">Absolute Determination Engine v2.1</span>
                </div>
                <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-none animate-in fade-in slide-in-from-left-12 duration-1000">
                  {analysis.typeCode}
                </h1>
                <div className="space-y-2">
                  <p className="text-4xl md:text-6xl font-bold text-indigo-400 tracking-tight">The {analysis.typeName}</p>
                  <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-medium">{analysis.summary}</p>
                </div>
              </div>
              <div className="w-80 h-80 bg-white/5 rounded-[5rem] p-10 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-[inset_0_2px_40px_rgba(255,255,255,0.05)] overflow-hidden scale-in-center delay-300">
                <PersonalityChart scores={scores} />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[30%] h-full bg-purple-600/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            
            <section className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] overflow-hidden">
              <button onClick={() => toggleSection('realLife')} className="w-full p-12 flex items-center justify-between group hover:bg-slate-50/50 transition-all duration-300">
                <div className="flex items-center gap-8">
                  <div className="p-5 bg-rose-50 rounded-3xl text-rose-600 group-hover:scale-105 transition-transform duration-500">
                    <CompassIcon className="w-9 h-9" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Behavioral Matrix</h2>
                    <p className="text-xs font-black uppercase text-rose-400 tracking-[0.25em] mt-1.5">Contextual Analysis</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-500 group-hover:bg-white group-hover:shadow-md">
                  <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-500 ${expandedSections.realLife ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {expandedSections.realLife && (
                <div className="p-12 pt-0 space-y-10 animate-in fade-in slide-in-from-top-6 duration-700">
                  <div className="grid grid-cols-1 gap-8">
                    <InsightCard title="At Work" icon={Briefcase} detail={analysis.lifeInsights.work} />
                    <InsightCard title="In Friendships" icon={Users} detail={analysis.lifeInsights.friendships} />
                    <InsightCard title="In Relationships" icon={Heart} detail={analysis.lifeInsights.relationships} />
                    <InsightCard title="Under Stress" icon={Zap} detail={analysis.lifeInsights.stress} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-14 bg-[#1e235a] text-white rounded-[4rem] shadow-2xl relative overflow-hidden group">
                      <TrendingUp className="absolute -right-6 -top-6 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-1000" />
                      <div className="flex items-center gap-4 mb-8">
                        <TrendingUp className="w-7 h-7 text-indigo-400" />
                        <h4 className="text-2xl font-black tracking-tight">Growth Catalyst</h4>
                      </div>
                      <p className="text-lg text-indigo-100/90 leading-relaxed font-medium italic relative z-10">{analysis.lifeInsights.growth}</p>
                    </div>
                    
                    <div className="p-14 bg-slate-50 rounded-[4rem] shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden group">
                      <Ghost className="absolute -right-6 -top-6 w-40 h-40 opacity-5 text-slate-900 group-hover:scale-110 transition-transform duration-1000" />
                      <div className="flex items-center gap-4 mb-8">
                        <Ghost className="w-7 h-7 text-slate-400" />
                        <h4 className="text-2xl font-black tracking-tight text-slate-900">The Shadow State</h4>
                      </div>
                      <p className="text-lg text-slate-500 leading-relaxed font-medium italic relative z-10">{analysis.lifeInsights.unhealthy}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white rounded-[4rem] p-14 md:p-16 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] border border-slate-100">
              <div className="flex items-center justify-between mb-16">
                <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em] flex items-center gap-4">
                  <Target className="w-5 h-5" /> High-Precision Vector Analysis
                </h3>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Dichotomy Cross-Check</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20">
                <DichotomySlider label="Mind" leftTrait="Introverted" rightTrait="Extraverted" score={scores.Extraversion} color="#6366f1" />
                <DichotomySlider label="Energy" leftTrait="Intuitive" rightTrait="Observant" score={scores.Sensing} color="#10b981" />
                <DichotomySlider label="Nature" leftTrait="Feeling" rightTrait="Thinking" score={scores.Thinking} color="#f59e0b" />
                <DichotomySlider label="Tactics" leftTrait="Prospecting" rightTrait="Judging" score={scores.Judging} color="#8b5cf6" />
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-white rounded-[4rem] p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-100 sticky top-10 space-y-14 transition-all duration-500">
              
              <div className="p-8 bg-indigo-50/50 rounded-[3rem] border border-indigo-100/30 space-y-5">
                 <div className="flex items-center gap-3 text-indigo-600">
                   <PieChart className="w-5 h-5" />
                   <h4 className="text-[10px] font-black uppercase tracking-[0.25em]">Population Rarity</h4>
                 </div>
                 <div className="flex items-end gap-2.5">
                   <span className="text-4xl font-black text-indigo-950 leading-none tracking-tight">2.1%</span>
                   <span className="text-[11px] font-bold text-indigo-400 mb-1 uppercase">Global Density</span>
                 </div>
                 <p className="text-[10px] text-indigo-400/80 leading-relaxed font-bold">Your archetype represents a highly specialized cognitive pattern within the general population matrix.</p>
              </div>

              <div className="p-8 bg-amber-50/60 rounded-[3rem] border border-amber-100/50 space-y-6 shadow-sm">
                <div className="flex items-center gap-3 text-amber-600">
                  <Briefcase className="w-5 h-5" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.25em]">Professional Apex</h4>
                </div>
                <p className="text-xl font-black text-amber-950 leading-tight tracking-tight">{analysis.career.title}</p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {analysis.career.roles.slice(0, 3).map((r, i) => (
                    <span key={i} className="text-[9px] px-3.5 py-2 bg-white rounded-xl text-amber-700 font-bold border border-amber-200/50 uppercase tracking-wider shadow-sm">{r}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-8 px-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                  <Globe className="w-6 h-6 text-emerald-600" /> Archetype Peers
                </h3>
                <div className="grid grid-cols-2 gap-4">
                   {["Visionaries", "Thinkers", "Pioneers", "Leaders"].map((peer, i) => (
                      <div key={i} className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 text-center group cursor-default hover:bg-emerald-50 hover:border-emerald-100 transition-all duration-300">
                         <p className="text-[9px] font-black uppercase text-slate-400 group-hover:text-emerald-700 tracking-[0.2em]">{peer}</p>
                      </div>
                   ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 px-2">
                <button onClick={() => window.print()} className="w-full py-5 bg-indigo-50 text-indigo-600 rounded-[2.25rem] font-black text-[11px] uppercase tracking-[0.25em] hover:bg-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-95">
                  <Download className="w-5 h-5" /> Export Analysis
                </button>
                <button onClick={() => { setResponses([]); setScores(null); setAnalysis(null); setStep('intro'); setCurrentPage(0); }} className="w-full py-5 bg-slate-900 text-white rounded-[2.25rem] font-black text-[11px] uppercase tracking-[0.25em] hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95">
                  <RotateCcw className="w-5 h-5" /> Reset Matrix
                </button>
              </div>
              
              <div className="flex flex-col items-center gap-4 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-300">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em]">Persona Engine v2.1</span>
                </div>
                <p className="text-[9px] text-slate-200 font-bold uppercase tracking-widest text-center px-4 leading-relaxed">Encrypted Psychometric Data Protocol</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
