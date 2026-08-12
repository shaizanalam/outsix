'use client';

import React from 'react';

type Props = {
  type?: 'skull' | 'gothic' | 'flame' | 'void' | 'graphic';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function TShirtGraphic({ type = 'skull', color = '#0A0A0A', style }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* T-SHIRT SILHOUETTE texture */}
      <svg
        viewBox="0 0 400 500"
        style={{
          width: '85%',
          height: '85%',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.8))',
        }}
      >
        <defs>
          {/* Fabric Shadow Gradient */}
          <linearGradient id="shirt-shadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="50%" stopColor="#0D0D0D" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>

          {/* Grungy Print Texture Filter */}
          <filter id="grunge-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* T-Shirt Base Outline */}
        <path
          d="M 120 40 Q 200 70 280 40 L 370 120 L 320 180 L 290 150 L 290 460 L 110 460 L 110 150 L 80 180 L 30 120 Z"
          fill="url(#shirt-shadow)"
          stroke="#222"
          strokeWidth="1.5"
        />

        {/* Collar Details */}
        <path
          d="M 140 47 Q 200 75 260 47"
          fill="none"
          stroke="#333"
          strokeWidth="4"
        />
        <path
          d="M 145 52 Q 200 78 255 52"
          fill="none"
          stroke="#111"
          strokeWidth="2"
        />

        {/* GRAPHIC PRINTS */}
        {type === 'gothic' || type === 'void' ? (
          /* WHITE GOTHIC / TRIBAL CROSS GRAPHIC (Image 2 style) */
          <g transform="translate(140, 160) scale(0.6)" filter="url(#grunge-noise)">
            {/* Top Flame/Spikes */}
            <path
              d="M 100 20 C 80 0 60 -20 100 -50 C 140 -20 120 0 100 20 Z"
              fill="#F5F5F0"
            />
            {/* Central Gothic Cross */}
            <path
              d="M 95 10 L 105 10 L 105 50 L 140 50 L 140 60 L 105 60 L 105 160 L 95 160 L 95 60 L 60 60 L 60 50 L 95 50 Z"
              fill="#F5F5F0"
            />
            {/* Spiky Tribal Line Web */}
            <path
              d="M 100 40 Q 30 80 10 160 Q 50 140 70 200 Q 90 120 100 180 Q 110 120 130 200 Q 150 140 190 160 Q 170 80 100 40 Z"
              fill="none"
              stroke="#F5F5F0"
              strokeWidth="5"
            />
            <path
              d="M 100 70 Q 10 140 -20 250 M 100 70 Q 190 140 220 250"
              fill="none"
              stroke="#F5F5F0"
              strokeWidth="4"
            />
            <path
              d="M 100 100 Q 40 180 20 280 M 100 100 Q 160 180 180 280"
              fill="none"
              stroke="#E1E1E1"
              strokeWidth="3"
            />
          </g>
        ) : (
          /* SKULL & DISTRESSED VINTAGE COLLAGE PRINT (Image 1 style) */
          <g transform="translate(115, 140) scale(0.85)">
            {/* Distressed White Box Background */}
            <rect
              x="20"
              y="20"
              width="130"
              height="160"
              fill="#DCDCDC"
              opacity="0.9"
              filter="url(#grunge-noise)"
            />

            {/* Red Paint Splash Accent */}
            <circle cx="120" cy="50" r="18" fill="#DC2626" opacity="0.85" />
            <path
              d="M 110 40 L 135 65 M 130 35 L 115 60"
              stroke="#B91C1C"
              strokeWidth="3"
            />

            {/* Skull Drawing */}
            <g transform="translate(45, 55) scale(0.65)">
              {/* Skull Cranium */}
              <path
                d="M 50 10 C 20 10 10 35 10 60 C 10 75 20 85 30 90 L 30 110 L 70 110 L 70 90 C 80 85 90 75 90 60 C 90 35 80 10 50 10 Z"
                fill="#070707"
              />
              {/* Eye Sockets */}
              <ellipse cx="33" cy="55" rx="11" ry="14" fill="#DCDCDC" />
              <ellipse cx="67" cy="55" rx="11" ry="14" fill="#DCDCDC" />
              {/* Nose Cavity */}
              <path d="M 50 68 L 44 80 L 56 80 Z" fill="#DCDCDC" />
              {/* Teeth Rows */}
              <path d="M 33 95 L 33 108 M 41 95 L 41 108 M 50 95 L 50 108 M 58 95 L 58 108 M 67 95 L 67 108" stroke="#DCDCDC" strokeWidth="2" />
            </g>

            {/* Vintage Newspaper Text Block overlay */}
            <rect x="25" y="110" width="60" height="40" fill="#111111" />
            <text x="30" y="124" fill="#DCDCDC" fontSize="7" fontFamily="monospace">OUTSIX</text>
            <text x="30" y="134" fill="#A1A1A1" fontSize="5" fontFamily="monospace">THE UNIFORM</text>
            <text x="30" y="142" fill="#A1A1A1" fontSize="5" fontFamily="monospace">SS26 DROP 01</text>

            {/* Red Circle "6" Badge */}
            <circle cx="125" cy="100" r="14" fill="none" stroke="#DC2626" strokeWidth="3" />
            <text x="120" y="105" fill="#DC2626" fontSize="14" fontWeight="bold" fontFamily="sans-serif">6</text>
          </g>
        )}
      </svg>
    </div>
  );
}
