export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#20B2AA', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00D9FF', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="url(#grad1)"
        strokeWidth="2"
        opacity="0.3"
      />

      {/* Central geometric shape - S */}
      <path
        d="M 60 60 Q 80 50 100 60 Q 120 70 100 90 Q 80 100 60 90"
        fill="none"
        stroke="url(#grad1)"
        strokeWidth="3"
        filter="url(#glow)"
      />

      {/* U shape */}
      <path
        d="M 110 60 L 110 100 Q 110 120 130 120 L 130 60"
        fill="none"
        stroke="#00D9FF"
        strokeWidth="3"
        filter="url(#glow)"
      />

      {/* E shape */}
      <path
        d="M 70 130 L 90 130 M 70 145 L 90 145 M 70 160 L 90 160"
        stroke="url(#grad1)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
      />

      {/* D shape */}
      <path
        d="M 110 130 L 110 160 Q 130 160 130 145 Q 130 130 110 130"
        fill="none"
        stroke="#00D9FF"
        strokeWidth="3"
        filter="url(#glow)"
      />

      {/* Accent dots */}
      <circle cx="50" cy="50" r="3" fill="#20B2AA" opacity="0.6" />
      <circle cx="150" cy="60" r="3" fill="#00D9FF" opacity="0.6" />
      <circle cx="160" cy="140" r="3" fill="#20B2AA" opacity="0.6" />
      <circle cx="40" cy="160" r="3" fill="#00D9FF" opacity="0.6" />
    </svg>
  );
}
