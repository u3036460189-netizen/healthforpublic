export const site = {
  name: 'Health for Public',
  tagline: "Let's be healthy",
  // One place to change the primary CTA everywhere it appears.
  ctaLabel: 'Book a free consultation',
  ctaHref: '#contact',
  email: 'hello@healthforpublic.com',
  responseTime: 'Replies within one working day',
}

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Our approach', href: '#approach' },
  { label: 'Field notes', href: '#notes' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export const trustPoints = [
  'Nurse-led guidance',
  'Evidence-based, plain language',
  'For homes, schools & workplaces',
]

export const stats = [
  { value: 18000, suffix: '+', label: 'People reached through community sessions' },
  { value: 240, suffix: '+', label: 'School and workplace workshops delivered' },
  { value: 96, suffix: '%', label: 'Would recommend to a friend or colleague' },
  { value: 35, suffix: '', label: 'Neighbourhoods and communities served' },
]

export const services = [
  {
    id: 'consultation',
    icon: 'heart',
    title: '1:1 Prevention Consultation',
    description:
      "Bring your household's real questions. We map the risks that matter for your age, work and travel, then leave you with a one-page plan you will actually follow.",
    format: 'Online · 45 minutes',
    price: '$49',
    featured: true,
    badge: 'Most booked',
  },
  {
    id: 'kit',
    icon: 'box',
    title: 'Household Protection Kit',
    description:
      'A season-ready box for the hallway cupboard: masks, sanitiser, a thermometer, rehydration salts and plain-language cards for every room.',
    format: 'Ships in 2–3 days',
    price: '$39',
  },
  {
    id: 'workshops',
    icon: 'users',
    title: 'School & Workplace Workshops',
    description:
      'Ninety minutes of practical, non-scary training: hand hygiene, how outbreaks spread, and what to do in the first 48 hours. Built for real rooms, not slideshows.',
    format: 'On-site or online · groups to 40',
    price: 'From $450',
  },
  {
    id: 'briefing',
    icon: 'mail',
    title: 'Seasonal Outbreak Briefing',
    description:
      'One short email each week plus a monthly live Q&A, so you hear about outbreaks from a nurse reading the data — not from a frightening headline.',
    format: 'Membership · weekly',
    price: '$9/mo',
  },
  {
    id: 'travel',
    icon: 'globe',
    title: 'Travel & Migrant Health Check',
    description:
      'A pre-travel briefing on vaccines, water, food and local outbreaks, plus a printable checklist to take to your travel clinic appointment.',
    format: 'Online · 30 minutes',
    price: '$59',
  },
  {
    id: 'course',
    icon: 'book',
    title: 'Caregiver Hygiene Course',
    description:
      'Six self-paced lessons for anyone caring for young children, elders or an immunocompromised family member. Short videos, checklists, no jargon.',
    format: 'Self-paced · 6 lessons',
    price: '$29',
  },
]

export const principles = [
  {
    title: 'Translate the science',
    body: 'Guidance is only useful if it survives a busy Tuesday. Every recommendation is written for the kitchen table, not the journal.',
  },
  {
    title: 'Meet people where they are',
    body: 'Different homes have different budgets, languages and constraints. Plans are built around what you can actually do this week.',
  },
  {
    title: 'Prevent, do not panic',
    body: 'Calm, specific steps beat fear every time. No scare tactics, no miracle claims, no shame.',
  },
]

export const steps = [
  {
    title: 'Book a conversation',
    body: 'Pick a time that suits you and tell me who you are protecting and what has been worrying you.',
  },
  {
    title: 'Leave with a plan',
    body: 'A short, prioritised checklist for your household — what to do now, what can wait, what to watch.',
  },
  {
    title: 'Stay a step ahead',
    body: 'Seasonal reminders, outbreak alerts and a nurse to ask when something changes in your community.',
  },
]

export const posts = [
  {
    category: 'Prevention',
    title: 'Flu season without the fear: a 10-minute household checklist',
    excerpt:
      'The five things worth doing this week — and the three everyone worries about that barely change your risk.',
    readTime: '6 min read',
    date: '12 Nov 2026',
    tone: 'sage',
  },
  {
    category: 'Everyday habits',
    title: 'Hand hygiene that actually works (and the five moments people skip)',
    excerpt:
      'Soap, timing and drying: a nurse’s plain-language version of the guidance, minus the lecture.',
    readTime: '4 min read',
    date: '29 Oct 2026',
    tone: 'gold',
  },
  {
    category: 'Outbreaks',
    title: 'Measles is back: what unvaccinated adults need to know',
    excerpt:
      'Why one case can become twenty, who needs a booster, and how to check your records in ten minutes.',
    readTime: '8 min read',
    date: '14 Oct 2026',
    tone: 'clay',
  },
]

export const faqs = [
  {
    question: 'Is this a replacement for seeing my doctor?',
    answer:
      'No. Health for Public is prevention education and public health nursing support. I do not diagnose, prescribe or provide emergency care. If you are unwell, contact your doctor or local health service — and call your emergency number for anything urgent.',
  },
  {
    question: 'Who are the consultations designed for?',
    answer:
      'Parents and caregivers, older adults, people living with a chronic condition or a weakened immune system, teachers, and managers responsible for a workplace. If you are unsure whether it fits, book the free call and we will work it out together.',
  },
  {
    question: 'How do online consultations work?',
    answer:
      'You receive a private video link after booking. We talk for 45 minutes, and you leave with a written summary and a one-page prevention plan. A recording is available on request.',
  },
  {
    question: 'Do the protection kits ship internationally?',
    answer:
      'Kits ship regionally within 2–3 working days. For other countries I send a digital pack with a local shopping list, so you can build the same kit from a nearby pharmacy.',
  },
  {
    question: 'Can you train our whole school or company?',
    answer:
      'Yes. Sessions run on-site or online for up to 40 people, with group pricing, invoices and follow-up materials. Larger teams can be split across two sessions.',
  },
  {
    question: 'What if I need to reschedule?',
    answer:
      'Life happens. Move your booking free of charge up to 24 hours before the start time; a recording or summary is still yours to keep.',
  },
  {
    question: 'How is my information handled?',
    answer:
      'Consultation notes are kept confidential and never shared or sold. Payments are processed by a secure provider, and you can ask for your notes to be deleted at any time.',
  },
]
