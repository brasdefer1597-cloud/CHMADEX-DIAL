import React from 'react';
import { DialecticStyle } from '../types';

interface DialecticControlsProps {
  thesisStyle: DialecticStyle;
  setThesisStyle: (style: DialecticStyle) => void;
  antithesisStyle: DialecticStyle;
  setAntithesisStyle: (style: DialecticStyle) => void;
}

const DialecticControls: React.FC<DialecticControlsProps> = React.memo(({
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
        >
          <option value="chola">CHOLA (Barrio)</option>
          <option value="fresa">FRESA (Tech)</option>
          <option value="malandra">MALANDRA (Strat)</option>
        </select>
      </div>
      <div className="glass-panel rounded-xl p-3 border-l-2 border-malandra transition-all hover:bg-white/[0.05]">
        <label className="text-[8px] font-bold text-malandra uppercase tracking-[0.2em] block mb-1 opacity-70">Antítesis Node</label>
        <select
          value={antithesisStyle}
          onChange={(e) => setAntithesisStyle(e.target.value as DialecticStyle)}
          className="w-full bg-transparent text-[11px] font-bold outline-none cursor-pointer text-slate-300 appearance-none"
        >
          <option value="malandra">MALANDRA (Strat)</option>
          <option value="chola">CHOLA (Barrio)</option>
          <option value="fresa">FRESA (Tech)</option>
        </select>
      </div>
    </div>
  );
});

export default DialecticControls;
