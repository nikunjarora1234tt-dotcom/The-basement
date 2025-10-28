import React, { useState, useEffect } from 'react';

interface CrashScreenProps {
  messages: string[];
}

const CrashScreen: React.FC<CrashScreenProps> = ({ messages }) => {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);

  useEffect(() => {
    const timeoutIds = messages.map((msg, index) => {
      return setTimeout(() => {
        setVisibleMessages(prev => [...prev, msg]);
      }, (index + 1) * 1000);
    });

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] animate-[fadeIn_0.5s_ease-out]" style={{ animation: 'screen-shake 0.5s cubic-bezier(.36,.07,.19,.97) both' }}>
      <div className="w-full max-w-4xl text-center p-4">
        {visibleMessages.map((msg, index) => (
          <p
            key={index}
            className="font-mono text-2xl md:text-4xl text-red-500 uppercase mb-4 crash-glitch"
            data-text={`> ${msg}`}
            style={{ animationDelay: `${index * 1}s` }}
          >
            &gt; {msg}
          </p>
        ))}
      </div>
      {visibleMessages.length === messages.length && (
         <div className="absolute inset-0 bg-black animate-[fadeIn_2s_ease-out_forwards]" style={{animationDelay: '1s'}}></div>
      )}
    </div>
  );
};

export default CrashScreen;