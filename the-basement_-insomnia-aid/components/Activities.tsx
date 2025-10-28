import React, { useState } from 'react';
import { ACTIVITIES_DATA } from '../constants';
import MapPinIcon from './icons/MapPinIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

const Activities: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleActivity = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-black border border-[#FF69B4]/20 rounded-lg p-6">
      <h2 className="text-3xl font-normal uppercase tracking-[0.1em] text-center mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        Activities
      </h2>
      <div className="space-y-4">
        {ACTIVITIES_DATA.map((activity) => (
          <div key={activity.id} className="bg-black/50 border border-[#F8C7E8]/10 rounded-md overflow-hidden">
            <button
              onClick={() => toggleActivity(activity.id)}
              className="w-full p-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
            >
              <div>
                <h3 className="text-xl font-bold text-[#F8C7E8]">{activity.title}</h3>
                <p className="text-[#F8C7E8]/70 font-mono text-sm">{activity.description}</p>
              </div>
              <ChevronDownIcon className={`w-6 h-6 transform transition-transform ${expandedId === activity.id ? 'rotate-180' : ''}`} />
            </button>
            {expandedId === activity.id && (
              <div className="p-4 border-t border-[#F8C7E8]/10 animate-[fadeIn_0.5s_ease-out]">
                <h4 className="text-lg font-bold text-[#FF69B4] mb-3 uppercase tracking-wider">Sanctioned Locations:</h4>
                <div className="space-y-3">
                  {activity.locations.map((location) => (
                    <div key={location.name} className="flex items-start gap-3">
                      <MapPinIcon className="w-5 h-5 mt-1 text-[#FF69B4] flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[#F8C7E8]">{location.name}</p>
                        <p className="text-sm text-[#F8C7E8]/60 font-mono italic">{location.address}</p>
                        <p className="text-sm text-[#F8C7E8]/80 mt-1">{location.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;