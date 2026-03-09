
import React, { useState, useEffect, useRef } from 'react';
import { chalamandra } from './services/chalamandraService';
import { DialecticalState, ProcessingStatus, DialecticStyle, CapabilityStatus } from './types';
import { 
  BrainCircuit, 
  Zap, 
  Sparkles, 
  Shuffle, 
  Link as LinkIcon, 
  ExternalLink, 
  Loader2,
  Cpu,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Info,
  Cloud
} from 'lucide-react';

declare const chrome: any;

const App: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [result, setResult] = useState<DialecticalState | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>({ step: 'idle' });
  const [capabilities, setCapabilities] = useState<CapabilityStatus | null>(null);
  const [thesisStyle, setThesisStyle] = useState<DialecticStyle>('chola');
  const [antithesisStyle, setAntithesisStyle] = useState<DialecticStyle>('malandra');
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);

  useEffect(() => {
    chalamandra.checkCapabilities().then(setCapabilities);
    
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['lastSelectedText'], (res: any) => {
        if (res.lastSelectedText) {
          if (textareaRef.current) textareaRef.current.value = res.lastSelectedText;
          chrome.storage.local.remove(['lastSelectedText']);
        }
      });
    }
  }, []);

  const handleProcess = async () => {
    const input = textareaRef.current?.value || '';
    if (!input.trim()) return;
    setResult(null);
    setFeedback(null);
    setStatus({ step: 'analyzing_thesis', message: 'Iniciando Kernels...' });

    try {
      const data = await chalamandra.runDialectic(input, thesisStyle, antithesisStyle, (msg) => {
        setStatus(prev => ({ ...prev, message: msg }));
      });
      setResult(data);
      setStatus({ step: 'complete' });
    } catch (e) {
      setStatus({ step: 'error', message: 'Fallo en la sincronización cuántica.' });
    }
  };

  const handleDisruption = async () => {
    const input = textareaRef.current?.value || '';
    if (!input.trim()) return;
    setResult(null);
    setStatus({ step: 'disrupting', message: 'Hackeando realidad...' });

    try {
      const text = await chalamandra.generateDisruption(input);
      setResult({
        thesis: input,
        antithesis: "ORDEN ESTABLECIDO",
        synthesis: text,
        energySignature: "disruption-369"
      });
      setStatus({ step: 'complete' });
    } catch (e) {
      setStatus({ step: 'error', message: 'Error de disrupción.' });
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 select-none animate-in fade-in duration-500">
      <header className="flex justify-between items-center border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chola via-malandra to-fresa p-[1px]">
            <div className="w-full h-full bg-void rounded-xl flex items-center justify-center">
              <Sparkles className="text-malandra w-5 h-5 animate-pulse-slow" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase bg-gradient-to-r from-chola via-malandra to-fresa bg-clip-text text-transparent italic leading-none">
              Chalamandra
            </h1>
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1 mt-1">
              <Cpu className="w-2.5 h-2.5" /> Magistral Engine v4
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
           {capabilities && (
              <div className="flex items-center gap-2 text-[8px] font-mono uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10">
                <Cloud className="w-2.5 h-2.5" /> Gemini Cloud
              </div>
           )}
        </div>
      </header>

      <main className="space-y-5">
        <div className="relative group">
          {/* Bolt Optimization: Uncontrolled textarea to prevent full app re-renders on every keystroke */}
          <textarea
            ref={textareaRef}
            className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:ring-1 focus:ring-malandra outline-none transition-all placeholder:text-slate-600 resize-none font-light leading-relaxed scrollbar-hide"
            placeholder="Introduce dilema, idea o realidad a decodificar..."
          />
          {/* Fix: Moved 'title' attribute from Lucide 'Info' component to its parent 'div' because Lucide React components do not support 'title' as a direct prop. */}
          <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity" title="Selecciona texto en el navegador para cargarlo aquí automáticamente.">
            <Info className="w-4 h-4 cursor-help text-slate-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel rounded-xl p-3 border-l-2 border-chola transition-all hover:bg-white/[0.05]">
            <label className="text-[8px] font-bold text-chola uppercase tracking-[0.2em] block mb-1 opacity-70">Tesis Node</label>
            <select 
              value={thesisStyle} 
              onChange={(e) => setThesisStyle(e.target.value as DialecticStyle)}
              className="w-full bg-transparent text-[11px] font-bold outline-none cursor-pointer text-slate-300 appearance-none"
            >
              <option value="chola">CHOLA (Barrio)</option>
              <option value="fresa">FRESA (Tech)</option>
              <option value="malandra">MALANDRA (Strat)</option>
            </select>
          </div>
          <div className="glass-panel rounded-xl p-3 border-l-2 border-malandra transition-all hover:bg-white/[0.05]">
            <label className="text-[8px] font-bold text-malandra uppercase tracking-[0.2em] block mb-1 opacity-70">Antítesis Node</label>
            <select 
              value={antithesisStyle} 
              onChange={(e) => setAntithesisStyle(e.target.value as DialecticStyle)}
              className="w-full bg-transparent text-[11px] font-bold outline-none cursor-pointer text-slate-300 appearance-none"
            >
              <option value="malandra">MALANDRA (Strat)</option>
              <option value="chola">CHOLA (Barrio)</option>
              <option value="fresa">FRESA (Tech)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleProcess}
            disabled={status.step !== 'idle' && status.step !== 'complete' && status.step !== 'error'}
            className="flex-[2] bg-gradient-to-r from-chola to-malandra text-white font-black rounded-xl py-4 flex items-center justify-center gap-2 shadow-xl shadow-chola/10 hover:shadow-malandra/20 transition-all text-xs uppercase tracking-widest disabled:opacity-50 active:scale-95"
          >
            {status.step.includes('analyzing') || status.step === 'synthesizing' ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <BrainCircuit className="w-4 h-4" />
            )}
            Decodificar 369
          </button>
          <button
            onClick={handleDisruption}
            className="flex-1 glass-panel border-fresa/30 text-fresa font-bold rounded-xl py-4 flex items-center justify-center gap-2 text-xs uppercase hover:bg-fresa/10 transition-all active:scale-95"
          >
            <Shuffle className="w-4 h-4" />
            Disrupt
          </button>
        </div>
      </main>

      {status.step !== 'idle' && status.step !== 'complete' && (
        <div className="py-4 text-center border-y border-white/5 animate-pulse">
           <span className="text-[10px] font-mono text-hybrida uppercase tracking-widest">{status.message}</span>
        </div>
      )}

      {result && (
        <div className="space-y-5 pb-8 animate-in slide-in-from-bottom-6 duration-700">
          <div className="glass-panel rounded-xl p-5 border-l-4 border-chola relative group">
            <h4 className="text-[10px] font-black text-chola mb-3 flex items-center gap-2 uppercase tracking-tighter">
              <Zap className="w-3 h-3" /> Tesis: {thesisStyle.toUpperCase()}
            </h4>
            <div className="text-xs leading-relaxed text-slate-300 font-light prose prose-invert max-w-none">
              {result.thesis}
            </div>
            {result.thesisSources && result.thesisSources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                {result.thesisSources.map((s, i) => (
                  <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="text-[9px] bg-white/5 px-2 py-1 rounded flex items-center gap-1.5 hover:bg-white/10 text-slate-400 hover:text-malandra transition-colors max-w-[140px] truncate">
                    <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" /> {new URL(s.uri).hostname.replace('www.', '')}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="glass-panel rounded-xl p-5 border-l-4 border-malandra">
            <h4 className="text-[10px] font-black text-malandra mb-3 flex items-center gap-2 uppercase tracking-tighter">
              <Shuffle className="w-3 h-3" /> Antítesis: {antithesisStyle.toUpperCase()}
            </h4>
            <div className="text-xs leading-relaxed text-slate-300 font-light prose prose-invert max-w-none">
              {result.antithesis}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6 border-l-4 border-hybrida bg-gradient-to-br from-hybrida/10 via-transparent to-transparent shadow-quantum relative group">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-[10px] font-black text-hybrida flex items-center gap-2 uppercase tracking-tighter">
                <Sparkles className="w-3 h-3" /> Síntesis Salamandra Magistral
              </h4>
              <div className="flex gap-2">
                <button 
                  onClick={() => setFeedback('liked')}
                  className={`p-1.5 rounded-lg transition-colors ${feedback === 'liked' ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-white/5 text-slate-600'}`}
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => setFeedback('disliked')}
                  className={`p-1.5 rounded-lg transition-colors ${feedback === 'disliked' ? 'bg-fresa/20 text-fresa' : 'hover:bg-white/5 text-slate-600'}`}
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
                <button onClick={handleProcess} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 transition-colors" title="Regenerar Síntesis">
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="text-sm font-semibold leading-relaxed text-white italic border-l border-white/10 pl-4 py-1">
              "{result.synthesis}"
            </div>
            <div className="mt-6 flex justify-between items-center text-[8px] font-mono text-slate-600 uppercase tracking-widest pt-4 border-t border-white/5">
              <span>Signature: {result.energySignature}</span>
              <span className="animate-pulse flex items-center gap-1">
                <div className="w-1 h-1 bg-hybrida rounded-full"></div> Quantum Decoded
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
