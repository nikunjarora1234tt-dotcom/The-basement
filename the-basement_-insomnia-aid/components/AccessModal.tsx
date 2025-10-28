import React, { useState } from 'react';
import { USER_CREDENTIALS } from '../constants';
import KeyIcon from './icons/KeyIcon';

interface AccessModalProps {
  onAccessGranted: () => void;
  onClose: () => void;
  onCrash: (messages: string[]) => void;
}

const AccessModal: React.FC<AccessModalProps> = ({ onAccessGranted, onClose, onCrash }) => {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const forbiddenPattern = /fight\s*club|fc/i;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forbiddenPattern.test(passcode) || forbiddenPattern.test(username)) {
      onCrash(['YOU BROKE THE FIRST RULE.', 'YOU BROKE THE SECOND RULE.']);
      return;
    }

    const lowercasedUsername = username.toLowerCase();
    const correctUsernameKey = Object.keys(USER_CREDENTIALS).find(
      (key) => key.toLowerCase() === lowercasedUsername
    );

    if (correctUsernameKey && USER_CREDENTIALS[correctUsernameKey] === passcode) {
      onAccessGranted();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setUsername('');
      setPasscode('');
    }
  };

  const inputStyles = `w-full bg-black font-mono text-center text-xl uppercase tracking-[0.2em] p-3 rounded-md outline-none transition-all duration-200 border-2 text-[#F8C7E8] placeholder:text-[#C2185B]/50`;
  const errorStyles = 'border-red-500 animate-[shake_0.5s]';
  const normalStyles = 'border-[#FF69B4]/50 focus:border-[#F8C7E8] focus:shadow-[0_0_15px_#F8C7E8]';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-md bg-black border border-[#F8C7E8]/20 rounded-lg p-8 m-4 overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-[#F8C7E8]/50 animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="text-[#F8C7E8] mb-4">
                <KeyIcon className="w-16 h-16"/>
            </div>
          <h2 className="relative text-5xl font-normal uppercase tracking-[0.2em] text-[#F8C7E8] mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            ACCESS: PENDING
          </h2>
          <p className="font-mono text-[#F8C7E8]/70 mb-6">Authentication required. You are not your job.</p>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${inputStyles} ${error ? errorStyles : normalStyles}`}
              placeholder="USERNAME"
              autoCapitalize="off"
              autoCorrect="off"
            />
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className={`${inputStyles} ${error ? errorStyles : normalStyles}`}
              placeholder="PASSCODE"
            />
            <button type="submit" className="w-full pt-4 !mt-6 bg-[#F8C7E8]/10 border border-[#F8C7E8] text-[#F8C7E8] py-3 rounded-md uppercase tracking-widest font-bold hover:bg-[#F8C7E8] hover:text-black transition-colors duration-300">
              Initiate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccessModal;