
import React from 'react';
import { Sparkles, Cpu, Cloud } from 'lucide-react';
import { CapabilityStatus } from '../types';

interface HeaderProps {
  capabilities: CapabilityStatus | null;
}

export const Header: React.FC<HeaderProps> = ({ capabilities }) => {
  return (
    <header className="flex justify-between items-center border-b border-white/10 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chola via-malandra to-fresa p-[1px]">
          <div className="w-full h-full bg-void rounded-xl flex items-center justify-center">
            <Sparkles className="text-malandra w-5 h-5 animate-pulse-slow" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase bg-gradient-to-r from-chola via-malandra to-fresa bg-clip-text text-transparent italic leading-none">
            Chalamandra
          </h1>
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1 mt-1">
            <Cpu className="w-2.5 h-2.5" /> Magistral Engine v4.1
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
          {capabilities && (
            <div className="flex items-center gap-2 text-[8px] font-mono uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10">
              <Cloud className="w-2.5 h-2.5" /> Gemini Cloud
            </div>
          )}
      </div>
    </header>
  );
};
