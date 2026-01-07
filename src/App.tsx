
import React from 'react';
import { useChalamandra } from './hooks/useChalamandra';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { DialecticControls } from './components/DialecticControls';
import { ActionButtons } from './components/ActionButtons';
import { ResultsDisplay } from './components/ResultsDisplay';

const App: React.FC = () => {
  const {
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
  } = useChalamandra();

  return (
    <div className="p-6 flex flex-col gap-6 select-none animate-in fade-in duration-500">
      <Header capabilities={capabilities} />

      <main className="space-y-5">
        <InputSection input={input} setInput={setInput} />

        <DialecticControls
          thesisStyle={thesisStyle}
          setThesisStyle={setThesisStyle}
          antithesisStyle={antithesisStyle}
          setAntithesisStyle={setAntithesisStyle}
        />

        <ActionButtons
          status={status}
          onProcess={processDialectic}
          onDisrupt={triggerDisruption}
        />
      </main>

      {status.step !== 'idle' && status.step !== 'complete' && (
        <div className="py-4 text-center border-y border-white/5 animate-pulse">
           <span className="text-[10px] font-mono text-hybrida uppercase tracking-widest">{status.message}</span>
        </div>
      )}

      <ResultsDisplay
        result={result}
        thesisStyle={thesisStyle}
        antithesisStyle={antithesisStyle}
        feedback={feedback}
        setFeedback={setFeedback}
        onRegenerate={processDialectic}
      />
    </div>
  );
};

export default App;
