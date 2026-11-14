import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

export default function Articles() {
  return (
    <section id="articles" aria-labelledby="articles-title" className="py-20 sm:py-28 print:hidden">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="articles-title"
            eyebrow="防疫筆記"
            title="文章整理中"
            description="文章標題、作者、發布日期與正文：[待填]。未有正式文章前，請先參閱已刊載的傳染病百科及實用清單。"
          />
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#notifiable" className="rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink hover:border-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600">
            查看傳染病百科
          </a>
          <a href="#checklists" className="rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink hover:border-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600">
            查看實用清單
          </a>
        </div>
      </div>
    </section>
  )
}
