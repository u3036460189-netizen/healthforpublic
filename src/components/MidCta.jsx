import Button from './ui/Button.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'

export default function MidCta() {
  return (
    <section aria-labelledby="midcta-title" className="pb-4 sm:pb-8 print:hidden">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gold px-6 py-14 text-center shadow-gold sm:px-12 sm:py-16">
            {/* Decorative organic shapes */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 -top-16 h-52 w-52 rounded-full border-[26px] border-cream/25" />
              <div className="absolute -bottom-20 -right-8 h-60 w-60 rounded-full bg-cream/20" />
              <div className="absolute right-16 top-6 h-4 w-4 rotate-45 rounded-[4px] bg-ink/15" />
              <div className="absolute bottom-10 left-20 h-3 w-3 rounded-full bg-ink/15" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <img src={`${import.meta.env.BASE_URL}images/checklist-art.svg`} alt="紙張與核對符號的裝飾插畫" width="600" height="450" loading="lazy" className="mx-auto mb-5 h-36 w-auto sm:h-44" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70">
                實用清單
              </p>
              <h2
                id="midcta-title"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
              >
                居家防疫清單，隨時查閱。
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70 sm:text-base">
                網站現有的清單可在頁面上打勾及列印；無需訂閱或下載。
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="#checklists" variant="ink" size="lg">
                  即場打開居家檢查清單
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </div>

              <p className="mt-5 text-xs font-medium text-ink/70">可打勾、可列印</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
