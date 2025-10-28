import React, { useState, useEffect } from 'react';

interface InitiationScreenProps {
  onComplete: () => void;
}

const messages = [
  "You’re not broken. You’re awake.",
  "Welcome to the basement.",
  "You found us."
];

const InitiationScreen: React.FC<InitiationScreenProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => setVisible(true), 100);

    const messageTimer = setTimeout(() => {
      setVisible(false); // Start fade out
      
      const nextTimer = setTimeout(() => {
        if (index < messages.length - 1) {
          setIndex(prevIndex => prevIndex + 1);
        } else {
          onComplete();
        }
      }, 1500); // Wait for fade out to complete before changing text or completing

      return () => clearTimeout(nextTimer);
    }, 2500); // Time message is fully visible

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(messageTimer);
    };
  }, [index, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <p
        className={`text-center text-3xl md:text-4xl text-[#F8C7E8] transition-opacity duration-1000 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
      >
        {messages[index]}
      </p>
    </div>
  );
};

export default InitiationScreen;
