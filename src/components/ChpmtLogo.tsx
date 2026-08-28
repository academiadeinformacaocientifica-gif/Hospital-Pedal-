import React from 'react';

interface ChpmtLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'monogram';
  theme?: 'light' | 'dark' | 'color-on-white';
  height?: number | string;
}

export const ChpmtLogo: React.FC<ChpmtLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'light',
  height = 48,
}) => {
  // Brand color palette extracted directly from the official CHPMT insignia
  const burgundy = theme === 'dark' ? '#df6377' : '#7a2230';
  const green = theme === 'dark' ? '#7eb3a4' : '#45645a';
  const subtextColor = theme === 'dark' ? '#f0a2af' : '#7a2230';
  const mainTextColor = theme === 'dark' ? '#e1eee9' : '#45645a';

  if (variant === 'monogram') {
    return (
      <svg
        viewBox="0 0 160 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height }}
        className={`w-auto select-none ${className}`}
        aria-label="Logótipo CHPMT"
      >
        {/* Monogram CHPMT */}
        {/* C - Green */}
        <path
          d="M38 12C20 12 6 26 6 44C6 62 20 76 38 76H46V58H38C30.5 58 24 51.5 24 44C24 36.5 30.5 30 38 30H46V12H38Z"
          fill={green}
        />
        {/* H - Burgundy */}
        <path
          d="M28 34H44V49H64V34H80V88H64V65H44V88H28V34Z"
          fill={burgundy}
        />
        {/* P - Burgundy */}
        <path
          d="M58 54H84C95 54 102 61 102 71C102 81 95 88 84 88H72V104H58V54ZM72 75H82C85 75 87 73.5 87 71C87 68.5 85 67 82 67H72V75Z"
          fill={burgundy}
        />
        {/* M - Green */}
        <path
          d="M86 34H102L113 54L124 34H140V74H125V52L115 69H111L101 52V74H86V34Z"
          fill={green}
        />
        {/* T - Green */}
        <path
          d="M100 78H140V90H126V108H114V90H100V78Z"
          fill={green}
        />
      </svg>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <svg
          viewBox="0 0 160 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height }}
          className="w-auto shrink-0"
          aria-hidden="true"
        >
          {/* C - Green */}
          <path
            d="M38 12C20 12 6 26 6 44C6 62 20 76 38 76H46V58H38C30.5 58 24 51.5 24 44C24 36.5 30.5 30 38 30H46V12H38Z"
            fill={green}
          />
          {/* H - Burgundy */}
          <path
            d="M28 34H44V49H64V34H80V88H64V65H44V88H28V34Z"
            fill={burgundy}
          />
          {/* P - Burgundy */}
          <path
            d="M58 54H84C95 54 102 61 102 71C102 81 95 88 84 88H72V104H58V54ZM72 75H82C85 75 87 73.5 87 71C87 68.5 85 67 82 67H72V75Z"
            fill={burgundy}
          />
          {/* M - Green */}
          <path
            d="M86 34H102L113 54L124 34H140V74H125V52L115 69H111L101 52V74H86V34Z"
            fill={green}
          />
          {/* T - Green */}
          <path
            d="M100 78H140V90H126V108H114V90H100V78Z"
            fill={green}
          />
        </svg>

        <div className="flex flex-col justify-center text-left leading-tight">
          <span
            className="font-extrabold tracking-wider uppercase text-sm sm:text-base font-['Plus_Jakarta_Sans',sans-serif]"
            style={{ color: mainTextColor }}
          >
            Complexo Hospitalar
          </span>
          <span
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]"
            style={{ color: subtextColor }}
          >
            General "Pedalé"
          </span>
        </div>
      </div>
    );
  }

  // Full Variant with exact official layout
  return (
    <div className={`flex items-center gap-3 sm:gap-4 select-none ${className}`}>
      {/* Monogram CHPMT SVG */}
      <svg
        viewBox="0 0 160 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height }}
        className="w-auto shrink-0 transition-transform duration-300"
        aria-hidden="true"
      >
        {/* C - Green */}
        <path
          d="M38 12C20 12 6 26 6 44C6 62 20 76 38 76H46V58H38C30.5 58 24 51.5 24 44C24 36.5 30.5 30 38 30H46V12H38Z"
          fill={green}
        />
        {/* H - Burgundy */}
        <path
          d="M28 34H44V49H64V34H80V88H64V65H44V88H28V34Z"
          fill={burgundy}
        />
        {/* P - Burgundy */}
        <path
          d="M58 54H84C95 54 102 61 102 71C102 81 95 88 84 88H72V104H58V54ZM72 75H82C85 75 87 73.5 87 71C87 68.5 85 67 82 67H72V75Z"
          fill={burgundy}
        />
        {/* M - Green */}
        <path
          d="M86 34H102L113 54L124 34H140V74H125V52L115 69H111L101 52V74H86V34Z"
          fill={green}
        />
        {/* T - Green */}
        <path
          d="M100 78H140V90H126V108H114V90H100V78Z"
          fill={green}
        />
      </svg>

      {/* Typography Column */}
      <div className="flex flex-col justify-center text-left">
        <div
          className="font-black text-base sm:text-lg lg:text-xl tracking-tight leading-[1.05] uppercase font-['Plus_Jakarta_Sans',sans-serif]"
          style={{ color: mainTextColor }}
        >
          <div>COMPLEXO</div>
          <div>HOSPITALAR</div>
        </div>
        <div
          className="text-[8px] sm:text-[9.5px] lg:text-[10.5px] font-bold uppercase tracking-wider mt-0.5 leading-tight font-['Plus_Jakarta_Sans',sans-serif]"
          style={{ color: subtextColor }}
        >
          GENERAL - DE - EXÉRCITO - PEDRO MARIA TONHA “PEDALÉ”
        </div>
      </div>
    </div>
  );
};
