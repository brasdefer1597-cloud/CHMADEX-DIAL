import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { chalamandra } from './services/chalamandraService';
import { DialecticalState, ProcessingStatus, DialecticStyle, CapabilityStatus } from './types';
import { 
  BrainCircuit, 
  Loader2,
  Shuffle,
  Info
} from 'lucide-react';
import Header from './components/Header';
import DialecticControls from './components/DialecticControls';

const ResultDisplay = React.lazy(() => import('./components/ResultDisplay'));

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
        if (res.lastSelectedText && textareaRef.current) {
          textareaRef.current.value = res.lastSelectedText;
          chrome.storage.local.remove(['lastSelectedText']);
        }
      });
    }
  }, []);

  const handleProcess = useCallback(async () => {
    const currentInput = textareaRef.current?.value || '';
    if (!currentInput.trim()) return;

    setResult(null);
    setFeedback(null);
    setStatus({ step: 'analyzing_thesis', message: 'Iniciando Kernels...' });

    try {
      const data = await chalamandra.runDialectic(currentInput, thesisStyle, antithesisStyle, (msg) => {
        setStatus(prev => ({ ...prev, message: msg }));
      });
      setResult(data);
      setStatus({ step: 'complete' });
    } catch (e) {
      setStatus({ step: 'error', message: 'Fallo en la sincronización cuántica.' });
    }
  }, [thesisStyle, antithesisStyle]);

  const handleDisruption = useCallback(async () => {
    const currentInput = textareaRef.current?.value || '';
    if (!currentInput.trim()) return;

    setResult(null);
    setStatus({ step: 'disrupting', message: 'Hackeando realidad...' });

    try {
      const text = await chalamandra.generateDisruption(currentInput);
      setResult({
        thesis: currentInput,
        antithesis: "ORDEN ESTABLECIDO",
        synthesis: text,
        energySignature: "disruption-369"
      });
      setStatus({ step: 'complete' });
    } catch (e) {
      setStatus({ step: 'error', message: 'Error de disrupción.' });
    }
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6 select-none animate-in fade-in duration-500">
      <Header capabilities={capabilities} />

      <main className="space-y-5">
        <div className="relative group">
          <textarea
            ref={textareaRef}
            className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:ring-1 focus:ring-malandra outline-none transition-all placeholder:text-slate-600 resize-none font-light leading-relaxed scrollbar-hide"
            placeholder="Introduce dilema, idea o realidad a decodificar..."
            defaultValue=""
          />
          <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity" title="Selecciona texto en el navegador para cargarlo aquí automáticamente.">
            <Info className="w-4 h-4 cursor-help text-slate-400" />
          </div>
        </div>

        <DialecticControls
          thesisStyle={thesisStyle}
          setThesisStyle={setThesisStyle}
          antithesisStyle={antithesisStyle}
          setAntithesisStyle={setAntithesisStyle}
        />

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

      <Suspense fallback={<div className="py-4 text-center text-slate-500 text-xs">Cargando visualización...</div>}>
        <ResultDisplay
          result={result}
          thesisStyle={thesisStyle}
          antithesisStyle={antithesisStyle}
          feedback={feedback}
          setFeedback={setFeedback}
          onRegenerate={handleProcess}
        />
      </Suspense>
    </div>
  );
};

export default App;
