# Health for Public — single-page website

Nurse-led infectious disease prevention. Built with React 19 + Vite, styled entirely with Tailwind CSS utilities (no custom CSS files).

## Getting started

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # serve the production build
```

> If `git`/`npm` are not on PATH on this machine, use the full paths:
> `"C:\Program Files\Git\cmd\git.exe"` and `"C:\Program Files\nodejs\npm.cmd"`.

## Structure

```
index.html                 SEO meta, fonts, JSON-LD, Tailwind host classes
tailwind.config.js         Palette (#0B0B0F / #C9A84C / #F5F0E6), fonts, shadows, keyframes
src/
  main.jsx                 React entry
  index.css                Tailwind directives only
  App.jsx                  Page assembly + skip link
  data/content.js          All copy: CTA label, services, stats, FAQs, posts
  hooks/
    useInView.js           IntersectionObserver reveal hook
    useCountUp.js          Animated counters (reduced-motion aware)
    useScrolled.js         Scroll state for the condensing navbar
  components/
    Navbar.jsx             Sticky glass navbar, condenses on scroll, mobile menu, progress bar
    Hero.jsx               Above-the-fold headline, CTAs, trust row
    HeroArt.jsx            Organic SVG illustration + floating glass cards + rotating badge
    Stats.jsx              Animated impact counters
    Services.jsx           Offerings grid (featured card variant)
    Mission.jsx            Nurse story + glass quote + principles (dark section)
    MidCta.jsx             Gold mid-page CTA banner
    Steps.jsx              How it works
    BlogPreview.jsx        Field notes cards
    Newsletter.jsx         Weekly brief signup (glass panel, validation, success state)
    Faq.jsx                Accessible accordion (single-open)
    Footer.jsx             Closing CTA, link columns, back-to-top
    ui/                    Button, Icon, Logo, Reveal, SectionHeading
```

## Notes

- Primary CTA label lives in one place: `src/data/content.js` → `site.ctaLabel`.
- Fonts: Inter (headings) + Manrope (body) via Google Fonts.
- Accessibility: semantic landmarks, skip link, aria-expanded accordion, focus rings, reduced-motion support.
