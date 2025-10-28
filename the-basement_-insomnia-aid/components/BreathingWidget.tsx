import React from 'react';

const BreathingWidget: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-sky-50 border border-sky-200 rounded-lg">
        <h3 className="text-xl font-normal text-slate-800 text-center mb-6" style={{ fontFamily: "'Lora', serif" }}>
            Find Your Center
        </h3>
        <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute w-full h-full bg-sky-200/50 rounded-full animate-[pulse_8s_ease-in-out_infinite]"></div>
            <div 
                className="w-24 h-24 bg-sky-300/60 rounded-full flex items-center justify-center animate-[breathe_8s_ease-in-out_infinite]"
            >
                <p 
                    className="relative text-sky-800 font-sans uppercase font-semibold text-sm tracking-wider"
                >
                    <span className="breathe-text"></span>
                </p>
            </div>
        </div>
        <style>{`
            @keyframes breathe {
                0%, 100% { transform: scale(0.9); }
                50% { transform: scale(1.1); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(125, 211, 252, 0.5); }
                70% { transform: scale(1.2); box-shadow: 0 0 0 25px rgba(125, 211, 252, 0); }
            }
            .breathe-text::after {
                content: 'Breathe In';
                animation: breatheText 8s ease-in-out infinite;
            }
            @keyframes breatheText {
                0% { content: 'Breathe In'; opacity: 1; }
                49% { opacity: 1; }
                50% { content: 'Hold'; opacity: 1; }
                62% { opacity: 1; }
                63% { content: 'Breathe Out'; opacity: 1; }
                99% { opacity: 1; }
                100% { content: 'Breathe In'; opacity: 1; }
            }
        `}</style>
    </div>
  );
};

export default BreathingWidget;