export const site = {
  name: 'Health for Public',
  tagline: '一起健康',
  // One place to change the primary CTA everywhere it appears.
  ctaLabel: '訂閱每週防疫簡報',
  ctaHref: '#contact',
  email: 'hello@healthforpublic.com',
  responseTime: '一個工作天內回覆',
}

export const navLinks = [
  { label: '文章', href: '#articles' },
  { label: '傳染病百科', href: '#notifiable' },
  { label: '實用清單', href: '#checklists' },
  { label: '我們的理念', href: '#approach' },
  { label: '常見問題', href: '#faq' },
  { label: '聯絡', href: '#contact' },
]

export const trustPoints = [
  '護理師撰寫，有憑有據',
  '每週更新淺白實用指南',
  '適合家庭、學校與職場',
]

export const stats = [
  { value: 18000, suffix: '+', label: '人次透過簡報與社區講座受益' },
  { value: 120, suffix: '+', label: '篇淺白易明的防疫文章與指南' },
  { value: 96, suffix: '%', label: '讀者帶走一個今天就做得到的方法' },
  { value: 12, suffix: '', label: '年社區衛生護理經驗作為後盾' },
]

export const topics = ['全部', '預防', '疫情', '日常習慣', '家庭照顧']

export const posts = [
  {
    id: 'flu-checklist',
    category: '預防',
    title: '防禦流感季：10 分鐘完成的全家檢查清單',
    excerpt:
      '這週真正值得做的五件事，以及大家都在擔心、但其實影響很小的三件事。',
    readTime: '6 分鐘',
    date: '2026/11/12',
    tone: 'sage',
    featured: true,
  },
  {
    id: 'hand-hygiene',
    category: '日常習慣',
    title: '真正有效的洗手方式（以及多數人漏掉的五個時機）',
    excerpt: '肥皂、時間與擦乾：護理師版本的實用指引，沒有說教。',
    readTime: '4 分鐘',
    date: '2026/10/29',
    tone: 'gold',
  },
  {
    id: 'measles-adults',
    category: '疫情',
    title: '麻疹又回來了：未接種疫苗的成人該知道的事',
    excerpt:
      '為什麼一個病例會變成二十個、誰需要補種，以及如何在十分鐘內查到自己的接種紀錄。',
    readTime: '8 分鐘',
    date: '2026/10/14',
    tone: 'clay',
  },
  {
    id: 'norovirus-72h',
    category: '疫情',
    title: '家裡的諾羅病毒：72 小時防堵計畫',
    excerpt:
      '它幾天內就傳遍全家。如何管理一間病室、一間浴室，和一條非常盡責的毛巾。',
    readTime: '5 分鐘',
    date: '2026/09/30',
    tone: 'sage',
  },
  {
    id: 'adult-vaccines',
    category: '預防',
    title: '成人疫苗：50 歲之後被遺忘的補種',
    excerpt:
      '破傷風、帶狀皰疹、肺炎鏈球菌與年度流感：哪些是常規、哪些較新，以及如何查詢自己的紀錄。',
    readTime: '7 分鐘',
    date: '2026/09/18',
    tone: 'gold',
  },
  {
    id: 'school-sores',
    category: '家庭照顧',
    title: '鏈球菌感染、膿痂疹，與「她今天能上學嗎？」的掙扎',
    excerpt: '疹子、發燒，以及每位家長早晨最怕的決定：護理師的經驗法則。',
    readTime: '5 分鐘',
    date: '2026/09/04',
    tone: 'clay',
  },
  {
    id: 'masks-2026',
    category: '日常習慣',
    title: '2026 年還需要口罩嗎：什麼時候它仍值得戴上',
    excerpt:
      '沒有人喜歡口罩。但這些時候，它默默勝過其他所有方法——其他時候，它只是儀式。',
    readTime: '4 分鐘',
    date: '2026/08/21',
    tone: 'sage',
  },
]

export const principles = [
  {
    title: '把科學翻譯成人話',
    body: '知識只有在忙碌的星期二也用得上，才算有用。每篇文章都為廚房餐桌而寫，不是為期刊。',
  },
  {
    title: '走進人們的生活',
    body: '每個家庭的預算、語言與現實限制都不同。所有建議都落在「本週就做得到」的事上。',
  },
  {
    title: '預防，而非恐慌',
    body: '冷靜、具體的步驟永遠勝過恐嚇。沒有聳動標題，沒有奇蹟療法，也沒有羞辱。',
  },
]

export const faqs = [
  {
    question: '甚麼是「須呈報傳染病」？家長要留意甚麼？',
    answer:
      '香港《預防及控制疾病條例》（第599章）列明53種法定須呈報傳染病，註冊醫生發現懷疑或證實個案必須通知衞生防護中心，以便追蹤接觸者及防止擴散。家長的角色：及早就醫並說明接觸史與外遊史、讓患病子女依指引留家、按時接種疫苗。詳情可參考下方「傳染病百科」。',
  },
  {
    question: '文章由誰撰寫與把關？',
    answer:
      '每篇指南都由我——一位有十二年社區衛生經驗的註冊護理師——親自撰寫，發布前並對照最新的公共衛生指引。指引更新時，文章會加上標註日期的更新說明。',
  },
  {
    question: '讀這些等於醫療建議嗎？',
    answer:
      '不是。Health for Public 是預防衛教，無法診斷、開藥或取代你的醫師。任何緊急狀況，請直接聯絡當地醫療服務或撥打緊急電話。',
  },
  {
    question: '多久會有新內容？',
    answer:
      '大多數週刊出一篇深入文章，加上週二簡報——三分鐘摘要目前流行什麼、該養成哪個習慣、該放下哪個迷思。',
  },
  {
    question: '涵蓋哪些主題？',
    answer:
      '最貼近生活的傳染病：流感、諾羅病毒、麻疹、鏈球菌感染等；還有日常預防習慣、疫情解讀，以及給照顧者與學校的建議。罕見疾病我會引導你到專業來源，而不是瞎猜。',
  },
  {
    question: '可以建議主題或發問嗎？',
    answer:
      '非常歡迎。讀者的問題決定發稿順序，最好的問題會寫成完整文章，或收進每月 Q&A。來信請寄 hello@healthforpublic.com。',
  },
  {
    question: '舊文章會更新嗎？',
    answer:
      '會。每份季節性指南在該季來臨前都會重新審閱；更新日期標示在文章頂端，修正也會公開說明，而不是悄悄改掉。',
  },
]
