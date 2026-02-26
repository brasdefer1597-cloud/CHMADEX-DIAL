import React, { useState, useEffect, useCallback } from 'react';
import { chalamandra } from './services/chalamandraService';
import { DialecticalState, ProcessingStatus, DialecticStyle, CapabilityStatus } from './types';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [lastInput, setLastInput] = useState('');
  const [result, setResult] = useState<DialecticalState | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>({ step: 'idle' });
  const [capabilities, setCapabilities] = useState<CapabilityStatus | null>(null);
  const [thesisStyle, setThesisStyle] = useState<DialecticStyle>('chola');
  const [antithesisStyle, setAntithesisStyle] = useState<DialecticStyle>('malandra');
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);

  useEffect(() => {
    chalamandra.checkCapabilities().then(setCapabilities);
  }, []);

  const runDialectic = useCallback(async (text: string) => {
    if (!text.trim()) return;

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

  const handleInputProcess = useCallback((text: string) => {
      setLastInput(text);
      runDialectic(text);
  }, [runDialectic]);

  const handleRegenerate = useCallback(() => {
      if (lastInput) runDialectic(lastInput);
  }, [lastInput, runDialectic]);

  const handleDisruption = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setLastInput(text);
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

  return (
    <div className="p-6 flex flex-col gap-6 select-none animate-in fade-in duration-500">
      <Header capabilities={capabilities} />

      <InputSection
        thesisStyle={thesisStyle}
        setThesisStyle={setThesisStyle}
        antithesisStyle={antithesisStyle}
        setAntithesisStyle={setAntithesisStyle}
        status={status}
        onProcess={handleInputProcess}
        onDisrupt={handleDisruption}
      />

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
