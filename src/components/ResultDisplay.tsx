import React from 'react';
import {
  Zap,
  ExternalLink,
  Shuffle,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from 'lucide-react';
import { DialecticalState, DialecticStyle } from '../types';

interface ResultDisplayProps {
  result: DialecticalState | null;
  thesisStyle: DialecticStyle;
  antithesisStyle: DialecticStyle;
  feedback: 'liked' | 'disliked' | null;
  setFeedback: (feedback: 'liked' | 'disliked' | null) => void;
  onRegenerate: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = React.memo(({
  result,
  thesisStyle,
  antithesisStyle,
  feedback,
  setFeedback,
  onRegenerate
}) => {
  if (!result) return null;

  return (
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
            <button onClick={onRegenerate} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 transition-colors" title="Regenerar Síntesis">
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
  );
});

export default ResultDisplay;
