import React, { useState, useEffect, useCallback, useRef } from 'react';
import { chalamandra } from './services/chalamandraService';
import { DialecticalState, ProcessingStatus, DialecticStyle, CapabilityStatus } from './types';
import Header from './components/Header';
import ResultDisplay from './components/ResultDisplay';
import InputSection from './components/InputSection';

declare const chrome: any;

const App: React.FC = () => {
  const [initialInput, setInitialInput] = useState('');
  const lastProcessedInput = useRef('');
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
          setInitialInput(res.lastSelectedText);
          chrome.storage.local.remove(['lastSelectedText']);
        }
      });
    }
  }, []);

  const handleProcess = useCallback(async (text: string) => {
    if (!text.trim()) return;

    lastProcessedInput.current = text;
    setResult(null);
    setFeedback(null);
    setStatus({ step: 'analyzing_thesis', message: 'Iniciando Kernels...' });

    try {
      const data = await chalamandra.runDialectic(text, thesisStyle, antithesisStyle, (msg) => {
        setStatus(prev => ({ ...prev, message: msg }));
      });
      setResult(data);
      setStatus({ step: 'complete' });
    } catch (e) {
      setStatus({ step: 'error', message: 'Fallo en la sincronización cuántica.' });
    }
  }, [thesisStyle, antithesisStyle]);

  const handleDisruption = useCallback(async (text: string) => {
    if (!text.trim()) return;

    lastProcessedInput.current = text;
    setResult(null);
    setStatus({ step: 'disrupting', message: 'Hackeando realidad...' });

    try {
      const resultText = await chalamandra.generateDisruption(text);
      setResult({
        thesis: text,
        antithesis: "ORDEN ESTABLECIDO",
        synthesis: resultText,
        energySignature: "disruption-369"
      });
      setStatus({ step: 'complete' });
    } catch (e) {
      setStatus({ step: 'error', message: 'Error de disrupción.' });
    }
  }, []);

  const handleRegenerate = useCallback(() => {
    if (lastProcessedInput.current) {
      handleProcess(lastProcessedInput.current);
    }
  }, [handleProcess]);

  return (
    <div className="p-6 flex flex-col gap-6 select-none animate-in fade-in duration-500">
      <Header capabilities={capabilities} />

      <main>
        <InputSection
          initialInput={initialInput}
          onProcess={handleProcess}
          onDisruption={handleDisruption}
          status={status}
          thesisStyle={thesisStyle}
          setThesisStyle={setThesisStyle}
          antithesisStyle={antithesisStyle}
          setAntithesisStyle={setAntithesisStyle}
        />
      </main>

      {status.step !== 'idle' && status.step !== 'complete' && (
        <div className="py-4 text-center border-y border-white/5 animate-pulse">
           <span className="text-[10px] font-mono text-hybrida uppercase tracking-widest">{status.message}</span>
        </div>
      )}

      <ResultDisplay
        result={result}
        thesisStyle={thesisStyle}
        antithesisStyle={antithesisStyle}
        feedback={feedback}
        setFeedback={setFeedback}
        onRegenerate={handleRegenerate}
      />
    </div>
  );
};

export default App;
