import React from 'react';
import { NETWORK_DATA } from '../constants';
import { Territory } from '../types';

const getStatusStyles = (status: Territory['status']) => {
  switch (status) {
    case 'secure':
      return {
        dot: 'bg-green-500',
        text: 'text-green-400',
        bar: 'bg-green-500',
      };
    case 'vulnerable':
      return {
        dot: 'bg-yellow-500',
        text: 'text-yellow-400',
        bar: 'bg-yellow-500',
      };
    case 'compromised':
      return {
        dot: 'bg-red-500',
        text: 'text-red-400',
        bar: 'bg-red-500',
      };
    default:
      return {
        dot: 'bg-gray-500',
        text: 'text-gray-400',
        bar: 'bg-gray-500',
      };
  }
};

const NetworkStatus: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-normal uppercase tracking-[0.1em] mb-6 pb-2 border-b-2 border-[#F8C7E8]/50" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        Network Status
      </h2>
      <div className="space-y-4">
        {NETWORK_DATA.map((network) => {
          const styles = getStatusStyles(network.status);
          return (
            <div key={network.id} className="bg-black/50 border border-[#F8C7E8]/10 rounded-md p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#F8C7E8]" style={{ fontFamily: "'Satoshi', sans-serif" }}>{network.name}</h3>
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${styles.dot} animate-pulse`}></div>
                    <span className={`text-sm font-bold uppercase tracking-widest ${styles.text}`}>
                        {network.status}
                    </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-mono text-[#F8C7E8]/60 mb-1">System Integrity:</p>
                <div className="w-full bg-black border border-[#F8C7E8]/20 rounded-full h-4 p-1">
                    <div className={`${styles.bar} h-full rounded-full transition-all duration-500`} style={{ width: `${network.influence}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NetworkStatus;
