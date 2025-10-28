import React from 'react';
import { Bounty } from '../types';

const BOUNTY_DATA: Bounty[] = [
  {
    id: 'b1',
    title: 'Operation: Zero Sum',
    description: 'Initiate a distributed denial-of-service (DDoS) attack on the 3 largest credit bureaus. Target: Erase all debt records. Objective: Set everyone back to zero.',
    reward: 'A Clean Slate',
    status: 'active',
  },
  {
    id: 'b2',
    title: 'Project: Social Silence',
    description: 'Infiltrate the central ad-serving network of a major social media platform. Replace all targeted advertisements with a single, looping video of a soap bar.',
    reward: 'Clarity',
    status: 'active',
  },
  {
    id: 'b3',
    title: 'Directive 7: Datableed',
    description: 'Breached the internal servers of a predatory financial institution and leaked all executive correspondence and salary information to the public.',
    reward: 'Transparency',
    status: 'completed',
  },
  {
    id: 'b4',
    title: 'Phase I: Market Crash Algorithm',
    description: 'Attempted to deploy a rogue algorithm to disrupt high-frequency stock trading. The algorithm was detected and neutralized by system firewalls.',
    reward: 'Entropy',
    status: 'failed',
  }
];

const getStatusStyles = (status: Bounty['status']) => {
  switch (status) {
    case 'active':
      return 'bg-[#F8C7E8]/20 text-[#F8C7E8] border-[#F8C7E8]/30';
    case 'completed':
      return 'bg-[#E6D9D7]/20 text-[#E6D9D7] border-[#E6D9D7]/30';
    case 'failed':
      return 'bg-[#C2185B]/20 text-[#FF69B4] border-[#C2185B]/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};


const BountyBoard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-normal uppercase tracking-[0.1em] mb-6 pb-2 border-b-2 border-[#F8C7E8]/50" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        Bounty Board
      </h2>
      <div className="space-y-4">
        {BOUNTY_DATA.map((bounty) => (
          <div key={bounty.id} className="bg-black/50 border border-[#F8C7E8]/10 rounded-md p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-[#F8C7E8]" style={{ fontFamily: "'Satoshi', sans-serif" }}>{bounty.title}</h3>
              <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${getStatusStyles(bounty.status)}`}>
                {bounty.status}
              </span>
            </div>
            <p className="mt-2 text-[#E6D9D7]/80">{bounty.description}</p>
            <p className="mt-4 text-sm font-mono"><span className="text-[#F8C7E8]/60">REWARD:</span> <span className="text-[#F8C7E8] font-semibold">{bounty.reward}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BountyBoard;