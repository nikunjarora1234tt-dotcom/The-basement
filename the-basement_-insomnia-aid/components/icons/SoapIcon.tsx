import React from 'react';

const SoapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M20,6H4C2.895,6,2,6.895,2,8v8c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V8C22,6.895,21.105,6,20,6z" />
  </svg>
);

export default SoapIcon;
