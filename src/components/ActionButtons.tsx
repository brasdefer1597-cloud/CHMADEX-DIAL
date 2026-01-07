
import React from 'react';
import { Loader2, BrainCircuit, Shuffle } from 'lucide-react';
import { ProcessingStatus } from '../types';

interface ActionButtonsProps {
  status: ProcessingStatus;
  onProcess: () => void;
  onDisrupt: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ status, onProcess, onDisrupt }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onProcess}
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
        onClick={onDisrupt}
        className="flex-1 glass-panel border-fresa/30 text-fresa font-bold rounded-xl py-4 flex items-center justify-center gap-2 text-xs uppercase hover:bg-fresa/10 transition-all active:scale-95"
      >
        <Shuffle className="w-4 h-4" />
        Disrupt
      </button>
    </div>
  );
};
