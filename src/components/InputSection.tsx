import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DialecticStyle, ProcessingStatus } from '../types';
import { BrainCircuit, Loader2, Shuffle, Info } from 'lucide-react';
import DialecticControls from './DialecticControls';

interface InputSectionProps {
  thesisStyle: DialecticStyle;
  setThesisStyle: (style: DialecticStyle) => void;
  antithesisStyle: DialecticStyle;
  setAntithesisStyle: (style: DialecticStyle) => void;
  onProcess: (text: string) => void;
  onDisrupt: (text: string) => void;
  status: ProcessingStatus;
}

declare const chrome: any;

const InputSection: React.FC<InputSectionProps> = React.memo(({
  thesisStyle,
  setThesisStyle,
  antithesisStyle,
  setAntithesisStyle,
  onProcess,
  onDisrupt,
  status
}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef('');

  // Keep inputRef in sync with input state
  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  // Load last selected text from storage on mount
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['lastSelectedText'], (res: any) => {
        if (res.lastSelectedText) {
          setInput(res.lastSelectedText);
          chrome.storage.local.remove(['lastSelectedText']);
        }
      });
    }
  }, []);

  const handleProcessClick = useCallback(() => {
    onProcess(inputRef.current);
  }, [onProcess]);

  const handleDisruptClick = useCallback(() => {
    onDisrupt(inputRef.current);
  }, [onDisrupt]);

  return (
    <div className="space-y-5">
        <div className="relative group">
          <textarea
            className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:ring-1 focus:ring-malandra outline-none transition-all placeholder:text-slate-600 resize-none font-light leading-relaxed scrollbar-hide"
            placeholder="Introduce dilema, idea o realidad a decodificar..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
            onClick={handleProcessClick}
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
            onClick={handleDisruptClick}
            className="flex-1 glass-panel border-fresa/30 text-fresa font-bold rounded-xl py-4 flex items-center justify-center gap-2 text-xs uppercase hover:bg-fresa/10 transition-all active:scale-95"
          >
            <Shuffle className="w-4 h-4" />
            Disrupt
          </button>
        </div>
    </div>
  );
});

export default InputSection;
