const glyphs = {
  shield: () => (
    <>
      <path d="M12 3.25 19 6v5.6c0 4.7-2.9 8.3-7 9.65-4.1-1.35-7-4.95-7-9.65V6l7-2.75Z" />
      <path d="m9.2 12.1 1.9 1.9 3.7-3.9" />
    </>
  ),
  leaf: () => (
    <>
      <path d="M20 4.5c0 8.6-5.2 13.5-11.4 13.5H4.5c0-7.9 4.9-12.6 11.2-12.6H20Z" />
      <path d="M4.5 20c2.2-4.8 5.6-8.3 10.2-10.4" />
    </>
  ),
  heart: () => (
    <>
      <path d="M12 20s-7.2-4.3-7.2-9.2A4.3 4.3 0 0 1 12 7.8a4.3 4.3 0 0 1 7.2 3c0 4.9-7.2 9.2-7.2 9.2Z" />
      <path d="M7.4 9.8h1.9l1 1.9 1.2-3.4 1 2.2h1.9" />
    </>
  ),
  box: () => (
    <>
      <path d="M3.5 8.2 12 3.8l8.5 4.4v7.6L12 20.2l-8.5-4.4V8.2Z" />
      <path d="M3.5 8.2 12 12.6l8.5-4.4M12 12.6v7.6" />
      <path d="m8.6 6 8.5 4.4" />
    </>
  ),
  users: () => (
    <>
      <circle cx="9" cy="8.2" r="3.1" />
      <path d="M3.4 19.6c0-3 2.5-5.2 5.6-5.2s5.6 2.2 5.6 5.2" />
      <path d="M16.2 5.6a3 3 0 0 1 0 5.6" />
      <path d="M17.6 14.7c1.9.6 3.2 2.3 3.2 4.4" />
    </>
  ),
  mail: () => (
    <>
      <rect x="3.2" y="5.5" width="17.6" height="13" rx="2.6" />
      <path d="m4.5 7.5 7.5 5.4 7.5-5.4" />
    </>
  ),
  globe: () => (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.4c2.4 2.4 3.6 5.3 3.6 8.6s-1.2 6.2-3.6 8.6c-2.4-2.4-3.6-5.3-3.6-8.6S9.6 5.8 12 3.4Z" />
    </>
  ),
  book: () => (
    <>
      <path d="M4 5.6A2.6 2.6 0 0 1 6.6 3H20v14.4H6.6A2.6 2.6 0 0 0 4 20V5.6Z" />
      <path d="M4 20a2.6 2.6 0 0 1 2.6-2.6H20V21H6.6A2.6 2.6 0 0 1 4 20Z" />
      <path d="M8.2 7.4h7.4" />
    </>
  ),
  check: () => <path d="m4.5 12.4 4.6 4.6L19.5 6.6" />,
  arrowRight: () => (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </>
  ),
  arrowUpRight: () => (
    <>
      <path d="M7 17 17 7" />
      <path d="M8.4 7H17v8.6" />
    </>
  ),
  arrowUp: () => (
    <>
      <path d="M12 19.5v-15" />
      <path d="m6 10.5 6-6 6 6" />
    </>
  ),
  arrowDown: () => (
    <>
      <path d="M12 4.5v15" />
      <path d="m6 13.5 6 6 6-6" />
    </>
  ),
  plus: () => (
    <>
      <path d="M12 5.5v13" />
      <path d="M5.5 12h13" />
    </>
  ),
  minus: () => <path d="M5.5 12h13" />,
  menu: () => (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </>
  ),
  close: () => (
    <>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  sparkle: () => (
    <>
      <path d="M12 3.5c.7 4.4 2.1 5.8 6.5 6.5-4.4.7-5.8 2.1-6.5 6.5-.7-4.4-2.1-5.8-6.5-6.5 4.4-.7 5.8-2.1 6.5-6.5Z" />
      <path d="M18 15.5c.35 2.1 1 2.75 3.1 3.1-2.1.35-2.75 1-3.1 3.1-.35-2.1-1-2.75-3.1-3.1 2.1-.35 2.75-1 3.1-3.1Z" />
    </>
  ),
  clock: () => (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3.2 2" />
    </>
  ),
  quote: () => (
    <path d="M9.5 6.5C6.4 8 5 10.5 5 13.4c0 2.4 1.5 4.1 3.6 4.1 1.9 0 3.3-1.3 3.3-3.1 0-1.7-1.2-3-2.9-3-.3 0-.6 0-.9.1.4-1.6 1.5-2.8 3.2-3.7l-1.8-1.3Zm9 0C15.4 8 14 10.5 14 13.4c0 2.4 1.5 4.1 3.6 4.1 1.9 0 3.3-1.3 3.3-3.1 0-1.7-1.2-3-2.9-3-.3 0-.6 0-.9.1.4-1.6 1.5-2.8 3.2-3.7l-1.8-1.3Z" />
  ),
  calendar: () => (
    <>
      <rect x="3.6" y="5.4" width="16.8" height="15" rx="2.6" />
      <path d="M3.6 10h16.8M8.4 3.6v3.6M15.6 3.6v3.6" />
    </>
  ),
  droplet: () => <path d="M12 3.6c3.2 3.5 5.4 6.3 5.4 9a5.4 5.4 0 0 1-10.8 0c0-2.7 2.2-5.5 5.4-9Z" />,
  virus: () => (
    <>
      <circle cx="12" cy="12" r="6.2" />
      <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" />
      <circle cx="10.2" cy="10.4" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="13.8" cy="13.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  house: () => (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6.5 9.5V20h11V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  search: () => (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </>
  ),
  stethoscope: () => (
    <>
      <path d="M6 3.5v4.2a3.6 3.6 0 0 0 7.2 0V3.5" />
      <path d="M5 3.5h2M12.2 3.5h2" />
      <path d="M9.6 11.3v3.1a4.4 4.4 0 0 0 8.8 0v-2.1" />
      <circle cx="18.4" cy="10.2" r="2.1" />
    </>
  ),
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.6, ...rest }) {
  const Glyph = glyphs[name]
  if (!Glyph) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <Glyph />
    </svg>
  )
}
