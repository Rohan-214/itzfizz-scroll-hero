import React from 'react';

/** Inline vector illustration keeps the demo self-contained and avoids a remote car asset. */
export default function Car() {
  return (
    <svg
      className="car-svg"
      viewBox="0 0 210 92"
      role="img"
      aria-label="Stylized top-view sports car"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="carPaint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8f8f3" />
          <stop offset="0.45" stopColor="#c9cec7" />
          <stop offset="1" stopColor="#858d85" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#17211f" />
          <stop offset="0.5" stopColor="#344541" />
          <stop offset="1" stopColor="#111917" />
        </linearGradient>
        <filter id="carShadow" x="-30%" y="-40%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <ellipse cx="105" cy="49" rx="91" ry="31" fill="#000" opacity=".48" filter="url(#carShadow)" />
      {/* wheels */}
      <g fill="#090b0a" stroke="#5d655f" strokeWidth="1.5">
        <rect x="35" y="4" width="34" height="18" rx="7" />
        <rect x="141" y="4" width="34" height="18" rx="7" />
        <rect x="35" y="70" width="34" height="18" rx="7" />
        <rect x="141" y="70" width="34" height="18" rx="7" />
      </g>
      <path d="M21 45 C23 27 39 18 59 15 L78 7 Q105 -1 132 7 L151 15 C171 18 187 27 189 45 C187 63 171 74 151 77 L132 85 Q105 93 78 85 L59 77 C39 74 23 63 21 45Z" fill="url(#carPaint)" stroke="#f8faf3" strokeWidth="1.2" />
      <path d="M56 23 Q105 12 154 23 L165 36 L165 56 L154 68 Q105 79 56 68 L45 56 L45 36Z" fill="#202724" />
      <path d="M67 24 Q105 17 143 24 L153 37 L57 37Z" fill="url(#glass)" stroke="#8a938b" strokeWidth=".8" />
      <path d="M57 55 L153 55 L143 67 Q105 74 67 67Z" fill="url(#glass)" stroke="#8a938b" strokeWidth=".8" />
      <path d="M105 19 L105 72" stroke="#aeb7ad" strokeWidth="1.2" opacity=".8" />
      <path d="M47 34 L61 29 M163 34 L149 29" stroke="#f4fff0" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M46 57 L61 62 M164 57 L149 62" stroke="#ff625b" strokeWidth="3" strokeLinecap="round" />
      <path d="M82 9 L128 9" stroke="#eff3e9" strokeWidth="2" strokeLinecap="round" opacity=".9" />
      <path d="M82 83 L128 83" stroke="#5c645d" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 45 L40 45 M170 45 L180 45" stroke="#5b625d" strokeWidth="2" />
    </svg>
  );
}
