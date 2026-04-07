export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ReportDrop logo"
    >
      {/* Document shape */}
      <rect
        x="8"
        y="4"
        width="24"
        height="32"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Folded corner */}
      <path
        d="M24 4V12H32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Lines representing report content */}
      <line x1="14" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="23" x2="22" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Drop accent */}
      <circle cx="30" cy="32" r="5" fill="#3B82F6" />
      <path
        d="M30 27L33 32H27L30 27Z"
        fill="#3B82F6"
      />
    </svg>
  );
}
