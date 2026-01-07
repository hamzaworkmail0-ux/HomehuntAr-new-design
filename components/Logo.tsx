import React from 'react';

interface LogoProps {
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "w-12 h-12", 
  strokeColor = "currentColor",
  fillColor = "transparent"
}) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagonal House Outline */}
      <path 
        d="M50 15 L85 35 V65 L50 85 L15 65 V35 L50 15" 
        fill={fillColor}
        stroke={strokeColor} 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Chimney */}
      <path 
        d="M25 30 V22 H32 V34" 
        fill="none"
        stroke={strokeColor} 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Central Square/Window */}
      <rect 
        x="40" y="40" width="20" height="20" 
        fill="none"
        stroke={strokeColor} 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Logo Gaps at Corners */}
      <path d="M15 35 L15 35" stroke="var(--brand-gold)" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
};

export default Logo;