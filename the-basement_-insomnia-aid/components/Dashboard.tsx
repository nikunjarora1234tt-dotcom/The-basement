import React, { useState } from 'react';
import BountyBoard from './BountyBoard';
import NetworkStatus from './TerritoryMap';
import Activities from './Activities';
import Chatrooms from './Chatrooms';

interface DashboardProps {
  onCrash: (messages: string[]) => void;
}

type Tab = 'bounties' | 'network' | 'activities' | 'chat';

const Dashboard: React.FC<DashboardProps> = ({ onCrash }) => {
  const [activeTab, setActiveTab] = useState<Tab>('bounties');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bounties':
        return <BountyBoard />;
      case 'network':
        return <NetworkStatus />;
      case 'activities':
        return <Activities />;
      case 'chat':
        return <Chatrooms onCrash={onCrash} />;
      default:
        return null;
    }
  };
  
  const TabButton: React.FC<{tabId: Tab; label: string}> = ({ tabId, label}) => (
      <button
        onClick={() => setActiveTab(tabId)}
        className={`px-6 py-3 font-mono text-sm uppercase transition-colors duration-200  
          ${activeTab === tabId 
            ? 'text-black bg-[#F8C7E8]' 
            : 'text-[#F8C7E8]/60 bg-black/30 hover:bg-white/5 hover:text-[#F8C7E8]'}`}
      >
        {label}
      </button>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-4xl font-normal uppercase tracking-[0.1em]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                The Basement
            </h1>
            <p className="font-mono text-xs text-[#F8C7E8]/50 mt-1">
                You are not your data profile. You are not your online persona. You are the glitch in the machine.
            </p>
        </div>
        <div className="text-right font-mono text-sm hidden md:block">
            <p className="text-[#F8C7E8]">CALLSIGN: <span className="text-[#F8C7E8] font-bold">NIGHTHAWK</span></p>
        </div>
      </header>

      <div className="border border-[#F8C7E8]/20 rounded-lg bg-black/50 p-1">
        <div className="flex items-center space-x-1">
            <TabButton tabId="bounties" label="Bounty Board" />
            <TabButton tabId="network" label="Network Status" />
            <TabButton tabId="activities" label="Activities" />
            <TabButton tabId="chat" label="Chat Rooms" />
        </div>
        <div className="p-2 md:p-4 mt-1 border-t border-[#F8C7E8]/20">
            <div className="relative bg-black border border-[#FF69B4]/20 p-6 rounded-md">
                {renderTabContent()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;