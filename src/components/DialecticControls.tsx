
import React from 'react';
import { DialecticStyle } from '../types';

interface DialecticControlsProps {
  thesisStyle: DialecticStyle;
  setThesisStyle: (style: DialecticStyle) => void;
  antithesisStyle: DialecticStyle;
  setAntithesisStyle: (style: DialecticStyle) => void;
}

const STYLES: { value: DialecticStyle; label: string }[] = [
  { value: 'chola', label: 'CHOLA (Barrio)' },
  { value: 'malandra', label: 'MALANDRA (Strat)' },
  { value: 'fresa', label: 'FRESA (Tech)' },
  { value: 'ballerina', label: 'BALLERINA (Flow)' },
  { value: 'ballet', label: 'BALLET (Rigid)' },
  { value: 'folklorico', label: 'FOLKLÓRICO (Roots)' },
];

export const DialecticControls: React.FC<DialecticControlsProps> = ({
  thesisStyle,
  setThesisStyle,
  antithesisStyle,
  setAntithesisStyle
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="glass-panel rounded-xl p-3 border-l-2 border-chola transition-all hover:bg-white/[0.05]">
        <label className="text-[8px] font-bold text-chola uppercase tracking-[0.2em] block mb-1 opacity-70">Tesis Node</label>
        <select
          value={thesisStyle}
          onChange={(e) => setThesisStyle(e.target.value as DialecticStyle)}
          className="w-full bg-transparent text-[11px] font-bold outline-none cursor-pointer text-slate-300 appearance-none"
          aria-label="Select Thesis Style"
        >
          {STYLES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div className="glass-panel rounded-xl p-3 border-l-2 border-malandra transition-all hover:bg-white/[0.05]">
        <label className="text-[8px] font-bold text-malandra uppercase tracking-[0.2em] block mb-1 opacity-70">Antítesis Node</label>
        <select
          value={antithesisStyle}
          onChange={(e) => setAntithesisStyle(e.target.value as DialecticStyle)}
          className="w-full bg-transparent text-[11px] font-bold outline-none cursor-pointer text-slate-300 appearance-none"
           aria-label="Select Antithesis Style"
        >
          {STYLES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
