import React, { useState, useEffect, useCallback, useRef } from 'react';
import { chalamandra } from './services/chalamandraService';
import { DialecticalState, ProcessingStatus, DialecticStyle, CapabilityStatus } from './types';
import Header from './components/Header';
import ResultDisplay from './components/ResultDisplay';
import InputSection from './components/InputSection';

declare const chrome: any;

const App: React.FC = () => {
  const inputRef = useRef(''); // Ref to keep track of input without re-rendering dependencies
  const [result, setResult] = useState<DialecticalState | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>({ step: 'idle' });
  const [capabilities, setCapabilities] = useState<CapabilityStatus | null>(null);
  const [thesisStyle, setThesisStyle] = useState<DialecticStyle>('chola');
  const [antithesisStyle, setAntithesisStyle] = useState<DialecticStyle>('malandra');
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);

  useEffect(() => {
    chalamandra.checkCapabilities().then(setCapabilities);
  }, []);

  const handleProcess = useCallback(async () => {
    const currentInput = inputRef.current;
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
    const currentInput = inputRef.current;
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

      <InputSection
        inputRef={inputRef}
        onProcess={handleProcess}
        onDisrupt={handleDisruption}
        status={status}
        thesisStyle={thesisStyle}
        setThesisStyle={setThesisStyle}
        antithesisStyle={antithesisStyle}
        setAntithesisStyle={setAntithesisStyle}
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
        onRegenerate={handleProcess}
      />
    </div>
  );
};

export default App;
