import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

interface InputAreaProps {
  inputRef: React.MutableRefObject<string>;
}

declare const chrome: any;

const InputArea: React.FC<InputAreaProps> = React.memo(({ inputRef }) => {
  const [value, setValue] = useState('');

  // Sync ref with local state
  useEffect(() => {
    inputRef.current = value;
  }, [value, inputRef]);

  // Load initial value from chrome storage
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['lastSelectedText'], (res: any) => {
        if (res.lastSelectedText) {
          setValue(res.lastSelectedText);
          chrome.storage.local.remove(['lastSelectedText']);
        }
      });
    }
  }, []);

  return (
    <div className="relative group">
      <textarea
        className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:ring-1 focus:ring-malandra outline-none transition-all placeholder:text-slate-600 resize-none font-light leading-relaxed scrollbar-hide"
        placeholder="Introduce dilema, idea o realidad a decodificar..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity" title="Selecciona texto en el navegador para cargarlo aquí automáticamente.">
        <Info className="w-4 h-4 cursor-help text-slate-400" />
      </div>
    </div>
  );
});

export default InputArea;
