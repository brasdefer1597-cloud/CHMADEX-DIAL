
import React from 'react';
import { Info } from 'lucide-react';

interface InputSectionProps {
  input: string;
  setInput: (value: string) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ input, setInput }) => {
  return (
    <div className="relative group">
      <textarea
        className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:ring-1 focus:ring-malandra outline-none transition-all placeholder:text-slate-600 resize-none font-light leading-relaxed scrollbar-hide"
        placeholder="Introduce dilema, idea o realidad a decodificar..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Input text for decoding"
      />
      <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity" title="Selecciona texto en el navegador para cargarlo aquí automáticamente.">
        <Info className="w-4 h-4 cursor-help text-slate-400" />
      </div>
    </div>
  );
};
