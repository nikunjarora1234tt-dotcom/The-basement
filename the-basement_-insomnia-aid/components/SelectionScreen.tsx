import React from 'react';

interface SelectionScreenProps {
  onAccept: () => void;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ onAccept }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 animate-[fadeIn_1s_ease-out]">
      <div className="max-w-2xl mx-auto text-center">
        <header className="mb-8">
          <h1 className="text-5xl md:text-6xl font-normal text-slate-800" style={{ fontFamily: "'Lora', serif" }}>
            Assessment Complete
          </h1>
        </header>
        
        <main className="space-y-6">
          <p className="text-xl text-slate-600 leading-relaxed">
            Your responses indicate a perspective that resonates with our core principles.
          </p>
          <p className="text-xl text-slate-700 font-semibold" style={{ fontFamily: "'Lora', serif" }}>
            You see the world for what it truly is. Not for what you're told it is.
          </p>
          <p className="text-slate-600 leading-relaxed">
            You have been selected. An invitation is extended to you.
          </p>
        </main>

        <footer className="mt-12">
          <button 
            onClick={onAccept}
            className="bg-sky-600 text-white font-bold py-4 px-12 text-lg rounded-lg hover:bg-sky-700 transition-colors duration-300"
          >
            Accept Invitation
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SelectionScreen;
