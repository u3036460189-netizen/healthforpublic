import { useState } from 'react'
import { cn } from '../lib/cn.js'
import { posts, topics } from '../data/content.js'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const toneGradients = {
  sage: 'from-sage-200 via-sage-100 to-cream-200',
  gold: 'from-gold-200 via-cream-200 to-cream-100',
  clay: 'from-[#E7C6B4] via-[#EFE0CF] to-cream-200',
}

function ThumbDecor({ tone }) {
  return (
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
  )
}

function Meta({ post }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium text-ink/60">
      <time dateTime={post.date.replace(/\//g, '-')}>{post.date}</time>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink/25" />
      <span className="inline-flex items-center gap-1.5">
        <Icon name="clock" className="h-3.5 w-3.5" />
        {post.readTime}
      </span>
    </p>
  )
}

function FeaturedCard({ post }) {
  return (
    <Reveal as="article" className="h-full">
      <a
        href={`#post-${post.id}`}
        className="group grid h-full overflow-hidden rounded-3xl border border-ink/10 bg-cream-100 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 lg:grid-cols-5"
      >
        <div className={cn('relative h-52 bg-gradient-to-br lg:h-full lg:min-h-[300px]', toneGradients[post.tone])}>
          <ThumbDecor />
          <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-gold-300">
            精選指南
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <Meta post={post} />
          <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-gold-800 sm:text-2xl">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/65 sm:text-[15px]">
            {post.excerpt}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink">
            閱讀這篇指南
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

function PostCard({ post, delay }) {
  return (
    <Reveal as="article" delay={delay} className="h-full">
      <a
        href={`#post-${post.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream-100 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
      >
        <div className={cn('relative h-40 bg-gradient-to-br', toneGradients[post.tone])}>
          <ThumbDecor />
          <span className="absolute left-4 top-4 rounded-full border border-ink/10 bg-cream/90 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur">
            {post.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <Meta post={post} />
          <h3 className="mt-3 font-display text-[1.1rem] font-semibold leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-gold-800">
            {post.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{post.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink">
            閱讀文章
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

export default function Articles() {
  const allTopics = topics[0] // 「全部」
  const [topic, setTopic] = useState(allTopics)

  const visible =
    topic === allTopics ? posts : posts.filter((post) => post.category === topic)
  const featured = visible.find((post) => post.featured)
  const rest = visible.filter((post) => !post.featured)

  return (
    <section id="articles" aria-labelledby="articles-title" className="py-20 sm:py-28 print:hidden">
      <div className="container">
        <SectionHeading
          id="articles-title"
          eyebrow="防疫筆記"
          title="防疫知識，淺白說給你聽"
          description="來自社區現場的短文，誠實、好用——關於最貼近生活的傳染病、真正有效的做法，以及你可以直接忽略的事。"
        />

        {/* Topic filter */}
        <Reveal delay={100}>
          <div
            role="group"
            aria-label="依主題篩選文章"
            className="mt-9 flex flex-wrap gap-2.5"
          >
            {topics.map((item) => {
              const active = topic === item
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTopic(item)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
                    active
                      ? 'border-ink bg-ink text-cream shadow-soft'
                      : 'border-ink/15 bg-cream-100/70 text-ink/70 hover:border-ink/35 hover:text-ink',
                  )}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Featured + grid */}
        <div className="mt-10 space-y-5">
          {featured && <FeaturedCard key={featured.id} post={featured} />}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <PostCard key={post.id} post={post} delay={(index % 3) * 100} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="rounded-3xl border border-dashed border-ink/20 p-10 text-center text-sm text-ink/60">
              這個主題還沒有文章——每週都會有新內容。
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
