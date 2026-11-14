import Icon from './ui/Icon.jsx'

const LEAF = 'M0 0c34 20 34 76 0 98C-34 76 -34 20 0 0Z'

function Leaf({ x, y, rotate = 0, scale = 1, fill, opacity = 0.9 }) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      fill={fill}
      opacity={opacity}
    >
      <path d={LEAF} />
      <path
        d="M0 10v78"
        stroke="#FBF8F1"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.45"
        fill="none"
      />
    </g>
  )
}

export default function HeroArt() {
  return (
    <div className="relative mx-auto w-full max-w-[500px] lg:mx-0" aria-hidden="false">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-full bg-gold/20 blur-3xl"
      />

      <div className="relative">
        {/* Organic back layers */}
        <div
          aria-hidden="true"
          className="absolute inset-5 rotate-6 rounded-[3rem] bg-sage-200/70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-5 -rotate-3 rounded-[3rem] bg-gold-200/80"
        />

        {/* Main illustration panel */}
        <figure className="relative overflow-hidden rounded-[2.75rem] border border-white/70 bg-cream-100 shadow-card">
          <svg
            viewBox="0 0 520 640"
            className="h-auto w-full"
            role="img"
            aria-label="Illustration of a protective shield resting among leaves"
          >
            <defs>
              <radialGradient id="heroHalo" cx="50%" cy="42%" r="75%">
                <stop offset="0%" stopColor="#FBF8F1" />
                <stop offset="100%" stopColor="#EDE6D8" />
              </radialGradient>
            </defs>

            <rect width="520" height="640" fill="url(#heroHalo)" />

            {/* Concentric rings */}
            <circle cx="260" cy="308" r="228" fill="none" stroke="#6F7F63" strokeOpacity="0.28" strokeDasharray="1 10" strokeLinecap="round" />
            <circle cx="260" cy="308" r="188" fill="none" stroke="#C9A84C" strokeOpacity="0.4" strokeDasharray="1 9" strokeLinecap="round" />
            <circle cx="260" cy="308" r="150" fill="#F5F0E6" fillOpacity="0.55" stroke="#0B0B0F" strokeOpacity="0.05" />

            {/* Leaves */}
            <Leaf x={104} y={130} rotate={-30} scale={1.45} fill="#6F7F63" opacity={0.6} />
            <Leaf x={428} y={158} rotate={26} scale={1.15} fill="#DFC789" opacity={0.85} />
            <Leaf x={92} y={486} rotate={160} scale={1.2} fill="#C9A84C" opacity={0.75} />
            <Leaf x={442} y={506} rotate={-152} scale={0.95} fill="#CBD4C0" opacity={0.9} />
            <Leaf x={160} y={74} rotate={-58} scale={0.7} fill="#CBD4C0" opacity={0.8} />
            <Leaf x={380} y={566} rotate={210} scale={0.65} fill="#6F7F63" opacity={0.55} />

            {/* Scattered dots */}
            <g fill="#C9A84C" opacity="0.5">
              <circle cx="150" cy="330" r="4" />
              <circle cx="386" cy="240" r="3.4" />
              <circle cx="196" cy="452" r="3" />
            </g>

            {/* Shield with leaf */}
            <g>
              <path
                d="M260 196 340 226v80c0 60-34 104-80 132-46-28-80-72-80-132v-80Z"
                fill="#0B0B0F"
                stroke="#C9A84C"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <g transform="translate(260 240) scale(0.62)">
                <path d={LEAF} fill="#C9A84C" />
                <path
                  d="M0 10v78"
                  stroke="#0B0B0F"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  opacity="0.35"
                  fill="none"
                />
              </g>
              <path
                d="M236 402c16 8 32 8 48 0"
                stroke="#FBF8F1"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
            </g>

            {/* Sparkles */}
            <g stroke="#C9A84C" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.8">
              <path d="M394 330v22M383 341h22" />
              <path d="M130 262v16M122 270h16" />
            </g>
          </svg>
        </figure>

        {/* Floating glass card — seasonal watch */}
        <div className="absolute -left-2 top-12 w-[168px] animate-float rounded-2xl border border-white/60 bg-white/50 p-3.5 shadow-soft backdrop-blur-md motion-reduce:animate-none sm:-left-8 sm:top-20 sm:w-[186px]">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-sage motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-600" />
            </span>
            Seasonal watch
          </p>
          <ul className="mt-2.5 space-y-1.5 text-[11px] font-medium text-ink/75">
            <li className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-600" />
                Influenza
              </span>
              <span className="text-ink/55">High</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sage" />
                Norovirus
              </span>
              <span className="text-ink/55">Rising</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink/60" />
                Measles
              </span>
              <span className="text-ink/55">Watch</span>
            </li>
          </ul>
        </div>

        {/* Floating glass card — kit ready */}
        <div className="absolute -right-1 bottom-14 w-[190px] animate-float-slow rounded-2xl border border-white/10 bg-ink/85 p-3.5 text-cream shadow-soft backdrop-blur-md motion-reduce:animate-none sm:-right-6 sm:bottom-20">
          <p className="flex items-center gap-2 text-[11px] font-semibold">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-ink">
              <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            Home kit restocked
          </p>
          <p className="mt-1.5 pl-8 text-[10.5px] leading-snug text-cream/60">
            12 essentials · next check 1 Dec
          </p>
        </div>

        {/* Rotating badge */}
        <div className="absolute -bottom-6 left-4 hidden h-24 w-24 sm:block sm:left-8">
          <div className="absolute inset-0 rounded-full border border-ink/10 bg-cream-100 shadow-soft" />
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full animate-spin-slow motion-reduce:animate-none"
            aria-hidden="true"
          >
            <defs>
              <path
                id="badge-circle"
                d="M50 50m-35 0a35 35 0 1 1 70 0a35 35 0 1 1 -70 0"
              />
            </defs>
            <text
              fontSize="9"
              letterSpacing="2.4"
              className="fill-ink/60 font-display font-semibold uppercase"
            >
              <textPath href="#badge-circle">Prevention • Care • Community •</textPath>
            </text>
          </svg>
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink shadow-gold">
              <Icon name="shield" className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
