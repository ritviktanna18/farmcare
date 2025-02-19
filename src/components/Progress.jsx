import React from 'react';

const Progress = ({ value = 0, className = '' }) => {
  return (
    <div className={`w-full bg-green-900/50 rounded-full h-2.5 ${className}`}>
      <div 
        className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;