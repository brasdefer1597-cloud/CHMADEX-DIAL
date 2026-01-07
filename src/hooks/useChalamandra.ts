
import { useState, useEffect, useCallback } from 'react';
import { chalamandra } from '../services/chalamandraService';
import { DialecticalState, ProcessingStatus, DialecticStyle, CapabilityStatus } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const chrome: any;

export const useChalamandra = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DialecticalState | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>({ step: 'idle' });
  const [capabilities, setCapabilities] = useState<CapabilityStatus | null>(null);
  const [thesisStyle, setThesisStyle] = useState<DialecticStyle>('chola');
  const [antithesisStyle, setAntithesisStyle] = useState<DialecticStyle>('malandra');
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);

  useEffect(() => {
    chalamandra.checkCapabilities().then(setCapabilities);

    if (typeof chrome !== 'undefined' && chrome.storage) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chrome.storage.local.get(['lastSelectedText'], (res: any) => {
        if (res.lastSelectedText) {
          setInput(res.lastSelectedText);
          chrome.storage.local.remove(['lastSelectedText']);
        }
      });
    }
  }, []);

  const processDialectic = useCallback(async () => {
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
      console.error(e);
      setStatus({ step: 'error', message: 'Fallo en la sincronización cuántica.' });
    }
  }, [input, thesisStyle, antithesisStyle]);

  const triggerDisruption = useCallback(async () => {
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
      console.error(e);
      setStatus({ step: 'error', message: 'Error de disrupción.' });
    }
  }, [input]);

  return {
    input,
    setInput,
    result,
    status,
    capabilities,
    thesisStyle,
    setThesisStyle,
    antithesisStyle,
    setAntithesisStyle,
    feedback,
    setFeedback,
    processDialectic,
    triggerDisruption
  };
};
