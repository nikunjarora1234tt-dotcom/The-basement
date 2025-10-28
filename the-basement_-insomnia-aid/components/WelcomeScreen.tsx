import React from 'react';
import CheckIcon from './icons/CheckIcon';

interface WelcomeScreenProps {
  onAcknowledge: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAcknowledge }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-[fadeIn_1s_ease-out]">
      <div className="w-full max-w-4xl text-left space-y-12">

        <div>
          <h2 className="text-4xl font-normal uppercase tracking-[0.1em] text-[#F8C7E8] mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            The Rules
          </h2>
          <div className="space-y-4 text-2xl md:text-3xl text-[#E6D9D7]/90" style={{fontFamily: "'Roboto Condensed', sans-serif"}}>
              <p>Rule 1: You <span className="text-[#FF69B4] font-bold">do not</span> talk about Fight Club.</p>
              <p>Rule 2: You <span className="text-[#FF69B4] font-bold">DO NOT</span> talk about Fight Club.</p>
          </div>
        </div>
        
        <div>
           <h2 className="text-4xl font-normal uppercase tracking-[0.1em] text-[#F8C7E8] mb-4" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            What We Are
          </h2>
          <p className="text-lg text-[#E6D9D7]/80 leading-relaxed" style={{fontFamily: "'Roboto Condensed', sans-serif"}}>
            You are not your job. You're not how much money you have in the bank. You are not the car you drive. You're not the contents of your wallet. We are the middle children of history. Raised by television to believe that one day we'd all be millionaires, and movie gods, and rock stars, but we won't. And we're slowly learning that fact. This is your life, and it's ending one minute at a time.
          </p>
        </div>

        <div>
            <h2 className="text-4xl font-normal uppercase tracking-[0.1em] text-[#F8C7E8] mb-4" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                First Steps
            </h2>
            <ul className="space-y-3 font-mono text-lg text-[#E6D9D7]/90">
                <li className="flex items-center"><CheckIcon className="w-5 h-5 mr-3 text-[#FF69B4]" /> Observe the Bounty Board. See the work that needs to be done.</li>
                <li className="flex items-center"><CheckIcon className="w-5 h-5 mr-3 text-[#FF69B4]" /> Listen in the Chat Rooms. Find others. You are not alone.</li>
                <li className="flex items-center"><CheckIcon className="w-5 h-5 mr-3 text-[#FF69B4]" /> Understand the Territory. Know who we are fighting against.</li>
            </ul>
        </div>

        <div className="text-center pt-8">
            <button
            onClick={onAcknowledge}
            className="w-full max-w-sm bg-[#F8C7E8]/10 border border-[#F8C7E8] text-[#F8C7E8] py-3 rounded-md uppercase tracking-widest font-bold hover:bg-[#F8C7E8] hover:text-black transition-colors duration-300"
            >
            Enter The Basement
            </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
