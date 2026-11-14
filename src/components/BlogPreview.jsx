import { cn } from '../lib/cn.js'
import { posts } from '../data/content.js'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const toneGradients = {
  sage: 'from-sage-200 via-sage-100 to-cream-200',
  gold: 'from-gold-200 via-cream-200 to-cream-100',
  clay: 'from-[#E7C6B4] via-[#EFE0CF] to-cream-200',
}

function PostCard({ post, delay }) {
  return (
    <Reveal as="article" delay={delay} className="h-full">
      <a
        href="#notes"
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream-100 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
      >
        <div className={cn('relative h-40 bg-gradient-to-br', toneGradients[post.tone])}>
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full opacity-50"
            viewBox="0 0 400 160"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <circle cx="330" cy="30" r="64" stroke="#0B0B0F" strokeOpacity="0.1" strokeDasharray="1 8" strokeLinecap="round" />
            <circle cx="46" cy="140" r="58" fill="#FBF8F1" fillOpacity="0.5" />
            <path
              d="M210 40c22 14 22 52 0 68-22-16-22-54 0-68Z"
              fill="#0B0B0F"
              fillOpacity="0.12"
            />
          </svg>
          <span className="absolute left-4 top-4 rounded-full border border-ink/10 bg-cream/90 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur">
            {post.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-3 text-xs font-medium text-ink/60">
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink/25" />
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </p>

          <h3 className="mt-3 font-display text-[1.1rem] font-semibold leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-gold-800">
            {post.title}
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
            {post.excerpt}
          </p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink">
            Read article
            <Icon
              name="arrowRight"
              className="h-4 w-4 text-gold-600 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </a>
    </Reveal>
  )
}

export default function BlogPreview() {
  return (
    <section id="notes" aria-labelledby="notes-title" className="py-20 sm:py-28">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="notes-title"
            eyebrow="Field notes"
            title="Prevention reading, in plain language"
            description="Short, honest articles from the clinic floor — what matters this season, and what you can safely ignore."
          />
          <a
            href="#contact"
            className="hidden items-center gap-1.5 text-sm font-semibold text-ink/70 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 md:inline-flex"
          >
            Get notes by email
            <Icon name="arrowRight" className="h-4 w-4 text-gold-600" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post.title} post={post} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
