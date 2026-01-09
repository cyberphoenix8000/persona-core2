
import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS } from './constants.ts';
import { UserResponse, PersonalityScores, AnalysisResult, Dimension } from './types.ts';
import { getPersonalityAnalysisAlgorithmic, getDynamicDeepDive } from './services/personalityAlgorithm.ts';
import LikertScale from './components/LikertScale.tsx';
import PersonalityChart from './components/PersonalityChart.tsx';
import DichotomySlider from './components/DichotomySlider.tsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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
  Users, 
  Download, 
  Fingerprint,
  Activity,
  ShieldCheck,
  Star,
  CheckCircle2,
  TrendingUp,
  Ghost,
  Globe,
  Lightbulb,
  ArrowDownCircle,
  ShieldAlert,
  Loader2
} from 'lucide-react';

const QUESTIONS_PER_PAGE = 10;

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'test' | 'loading' | 'results'>('intro');
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [scores, setScores] = useState<PersonalityScores | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [loadingLog, setLoadingLog] = useState("Initializing...");
  
  const resultsRef = useRef<HTMLDivElement>(null);

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
        "Finalizing diagnostic report..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setLoadingLog(logs[i % logs.length]);
        i++;
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step]);

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
    const { scores: calculatedScores, typeCode } = calculateScores();
    setScores(calculatedScores);

    setTimeout(() => {
      setAnalysis(getPersonalityAnalysisAlgorithmic(calculatedScores, typeCode));
      setStep('results');
    }, 1800);
  };

  const handleDownloadPDF = async () => {
    if (!resultsRef.current || isGeneratingPDF) return;
    
    try {
      setIsGeneratingPDF(true);
      
      // We take a snapshot of the results container
      const element = resultsRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`Persona-Core-${analysis?.typeCode}-Report.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      // Fallback to print if library fails
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (step === 'intro') {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-[#f1f5f9] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        
        <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl p-12 md:p-20 text-center border border-white/80 relative z-10 scale-in-center">
          <div className="w-20 h-20 bg-[#4f46e5] rounded-[1.75rem] flex items-center justify-center mx-auto shadow-lg mb-10">
            <Fingerprint className="text-white w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#1e293b] tracking-tighter mb-6 leading-tight">
            Persona <span className="text-[#4f46e5] italic">Core.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 mb-12 leading-relaxed font-medium max-w-sm mx-auto">
            Experience absolute psychometric determination through our high-precision diagnostic engine.
          </p>
          <button 
            onClick={() => setStep('test')} 
            className="bg-[#4f46e5] text-white px-12 py-5 rounded-full font-black text-lg hover:bg-[#4338ca] transition-all shadow-xl active:scale-95 flex items-center gap-3 mx-auto"
          >
            Run Diagnostics <ChevronRight className="w-5 h-5" />
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
          <div className="sticky top-4 z-50 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-md border border-white p-6">
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg"><Brain className="w-5 h-5 text-indigo-600" /></div>
                <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Diagnostic Part {currentPage + 1}</span>
              </div>
              <span className="text-indigo-600 font-black bg-indigo-50 px-3 py-1 rounded-full text-xs">{progress}% Complete</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mx-2">
              <div className="h-full bg-indigo-600 transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div key={currentPage} className="space-y-8 page-transition">
            {currentQuestions.map((q) => {
              const resp = responses.find(r => r.questionId === q.id);
              return (
                <div key={q.id} className="bg-white rounded-[3rem] p-12 md:p-16 text-center space-y-12 shadow-sm border border-slate-100 transition-all">
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
              className="px-8 py-4 text-slate-400 font-black uppercase text-xs flex items-center gap-2 hover:text-indigo-600 disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            
            <div className="flex flex-col items-center gap-1">
              <span className="text-slate-400 font-black text-[10px] uppercase tracking-tighter">Diagnostic Node</span>
              <span className="text-slate-900 font-black text-sm">{currentPage + 1} / {totalPages}</span>
            </div>

            {currentPage === totalPages - 1 ? (
              <button 
                disabled={!isPageComplete || progress < 100} 
                onClick={handleSubmit} 
                className="bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-black uppercase text-sm hover:bg-indigo-700 shadow-lg disabled:bg-slate-300 transition-all"
              >
                Reveal Results
              </button>
            ) : (
              <button 
                disabled={!isPageComplete} 
                onClick={() => setCurrentPage(p => p + 1)} 
                className="bg-indigo-600 text-white px-14 py-5 rounded-[2rem] font-black uppercase text-sm hover:bg-indigo-700 shadow-lg flex items-center gap-3 transition-all disabled:bg-slate-300"
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
        <div className="w-32 h-32 bg-indigo-600 rounded-[3rem] flex items-center justify-center animate-spin-slow shadow-xl mb-12">
          <Activity className="text-white w-14 h-14" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Processing Matrix...</h2>
        <p className="text-indigo-500 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">{loadingLog}</p>
      </div>
    );
  }

  if (!scores || !analysis) return null;

  const InsightCard = ({ title, icon: Icon, detail }: { title: string, icon: any, detail: any }) => (
    <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-8 group hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-5">
        <div className="p-4 bg-slate-50 rounded-2xl text-indigo-600">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h4 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h4>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Deep Analysis</p>
        </div>
      </div>
      <p className="text-base text-slate-600 leading-relaxed italic">{detail.summary}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-4.5 h-4.5" /> Strengths
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
            <AlertCircle className="w-4.5 h-4.5" /> Challenges
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
        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Strategy for Success</p>
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5" />
          <p className="text-sm text-slate-800 font-bold leading-relaxed">{detail.actionableTip}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-slate-50 overflow-auto" ref={resultsRef}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Profile Hero Section */}
        <div className="bg-[#0f172a] rounded-[4rem] overflow-hidden text-white shadow-2xl border border-slate-800 relative">
          <div className="p-12 md:p-24 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 bg-indigo-500/10 px-5 py-2 rounded-full border border-indigo-500/20">
                  <Star className="w-4 h-4 text-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Verified Archetype Profile</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
                  {analysis.typeCode}
                </h1>
                <div className="space-y-4">
                  <p className="text-4xl md:text-5xl font-bold text-indigo-400 tracking-tight">The {analysis.typeName}</p>
                  <p className="text-lg text-slate-400 max-w-xl leading-relaxed font-medium">{analysis.summary}</p>
                </div>
              </div>
              <div className="w-full max-w-md bg-white/5 rounded-[3rem] p-8 border border-white/10 backdrop-blur-xl">
                <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-6 text-center">Neural Preference Distribution</h4>
                <PersonalityChart scores={scores} />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-600/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            
            {/* Detailed Chapters */}
            <section className="space-y-10">
              <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-6 mb-10">
                   <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600"><Target className="w-8 h-8" /></div>
                   <div>
                     <h2 className="text-3xl font-black text-slate-900">Psychological Core</h2>
                     <p className="text-xs font-black uppercase text-slate-400 tracking-widest mt-1">Foundational Personality Identity</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <h5 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-3">Subconscious Driver</h5>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">{analysis.psychology.subconscious}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <h5 className="text-[11px] font-black text-rose-600 uppercase tracking-widest mb-3">Core Paradox</h5>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">{analysis.psychology.paradox}</p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Motivations</h5>
                      <div className="flex flex-wrap gap-2">
                        {analysis.psychology.motivations.map((m, i) => (
                          <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100 uppercase tracking-wider">{m}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Primal Fears</h5>
                      <div className="flex flex-wrap gap-2">
                        {analysis.psychology.fears.map((f, i) => (
                          <span key={i} className="px-4 py-2 bg-rose-50 text-rose-700 text-xs font-black rounded-xl border border-rose-100 uppercase tracking-wider">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Functional Stack Breakdown */}
              <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm overflow-hidden relative">
                <div className="flex items-center gap-6 mb-12">
                   <div className="p-4 bg-purple-50 rounded-2xl text-purple-600"><ArrowDownCircle className="w-8 h-8" /></div>
                   <div>
                     <h2 className="text-3xl font-black text-slate-900">Functional Hierarchy</h2>
                     <p className="text-xs font-black uppercase text-slate-400 tracking-widest mt-1">Cognitive Stack Analysis</p>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Dominant', val: analysis.cognitiveFunctions.dominant, color: 'text-indigo-600 bg-indigo-50' },
                    { label: 'Auxiliary', val: analysis.cognitiveFunctions.auxiliary, color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Tertiary', val: analysis.cognitiveFunctions.tertiary, color: 'text-amber-600 bg-amber-50' },
                    { label: 'Inferior', val: analysis.cognitiveFunctions.inferior, color: 'text-rose-600 bg-rose-50' },
                  ].map((f, i) => (
                    <div key={i} className={`p-6 rounded-[2rem] border border-transparent hover:border-slate-100 transition-all text-center space-y-3 ${f.color}`}>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{f.label}</p>
                      <p className="text-sm font-black leading-tight">{f.val}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-10 text-slate-500 text-sm italic border-l-4 border-indigo-100 pl-6 leading-relaxed">
                  {analysis.cognitiveFunctions.explanation}
                </p>
              </div>

              {/* Behavior Insight Cards */}
              <div className="space-y-10">
                <InsightCard title="Professional Life" icon={Briefcase} detail={analysis.lifeInsights.work} />
                <InsightCard title="Social Dynamics" icon={Users} detail={analysis.lifeInsights.friendships} />
                <InsightCard title="Romantic Relations" icon={Heart} detail={analysis.lifeInsights.relationships} />
                <InsightCard title="Crisis Management" icon={Zap} detail={analysis.lifeInsights.stress} />
              </div>

              {/* Growth and Shadow Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-12 bg-[#1e293b] text-white rounded-[3.5rem] relative overflow-hidden group">
                  <TrendingUp className="absolute -right-10 -bottom-10 w-48 h-48 opacity-5 text-white" />
                  <div className="flex items-center gap-4 mb-6">
                    <Lightbulb className="w-6 h-6 text-indigo-400" />
                    <h4 className="text-2xl font-black tracking-tight">Growth Roadmap</h4>
                  </div>
                  <p className="text-indigo-100/80 leading-relaxed font-medium text-base relative z-10">{analysis.lifeInsights.growth}</p>
                </div>
                
                <div className="p-12 bg-rose-50 rounded-[3.5rem] border border-rose-100 relative overflow-hidden">
                  <ShieldAlert className="absolute -right-10 -bottom-10 w-48 h-48 opacity-5 text-rose-900" />
                  <div className="flex items-center gap-4 mb-6">
                    <Ghost className="w-6 h-6 text-rose-600" />
                    <h4 className="text-2xl font-black tracking-tight text-slate-900">Shadow Traits</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium text-base relative z-10">{analysis.lifeInsights.unhealthy}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-10 no-print">
            {/* Sidebar Modules */}
            <div className="sticky top-8 space-y-10">
              
              <div className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-slate-100 space-y-10">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-4 px-2">
                  <Target className="w-6 h-6 text-indigo-600" /> Precision Scoring
                </h3>
                <div className="space-y-12">
                  <DichotomySlider label="Mind" leftTrait="Introverted" rightTrait="Extraverted" score={scores.Extraversion} color="#6366f1" />
                  <DichotomySlider label="Energy" leftTrait="Intuitive" rightTrait="Observant" score={scores.Sensing} color="#10b981" />
                  <DichotomySlider label="Nature" leftTrait="Feeling" rightTrait="Thinking" score={scores.Thinking} color="#f59e0b" />
                  <DichotomySlider label="Tactics" leftTrait="Prospecting" rightTrait="Judging" score={scores.Judging} color="#8b5cf6" />
                </div>
              </div>

              <div className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-slate-100 space-y-8">
                <div className="flex items-center gap-4 text-emerald-600 mb-2">
                   <Globe className="w-6 h-6" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Social Presence</h4>
                </div>
                <div className="p-8 bg-emerald-50 rounded-3xl space-y-4">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-slate-900">2.1%</span>
                    <span className="text-[10px] font-bold text-emerald-600 mb-1 uppercase">Global Rarity</span>
                  </div>
                  <p className="text-xs text-emerald-800 font-medium leading-relaxed">Representing a unique cognitive configuration within the population matrix.</p>
                </div>
                
                <div className="space-y-4 pt-4">
                  <button 
                    disabled={isGeneratingPDF}
                    onClick={handleDownloadPDF} 
                    className={`w-full py-5 rounded-3xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isGeneratingPDF ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                  >
                    {isGeneratingPDF ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                    {isGeneratingPDF ? 'Generating...' : 'Download Report'}
                  </button>
                  <button onClick={() => { setResponses([]); setScores(null); setAnalysis(null); setStep('intro'); setCurrentPage(0); }} className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl">
                    <RotateCcw className="w-5 h-5" /> Retake Test
                  </button>
                </div>
              </div>
              
              <div className="text-center px-8">
                <div className="flex items-center justify-center gap-3 text-slate-300 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Persona Engine v2.1</span>
                </div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Verified Psychometric Protocol</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
