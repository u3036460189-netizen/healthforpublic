/**
 * 繁簡切換：以 OpenCC（tw → cn）於用戶端轉換整個頁面文字。
 * 採用 DOM 級轉換 + MutationObserver，React 重新渲染後仍保持簡體。
 * 轉換器只在用戶第一次切換時才從 CDN 載入（之後瀏覽器快取）。
 *
 * 防呆設計：
 * 1. 轉換結果與現值相同時不寫入，避免 MutationObserver 無限迴圈。
 * 2. CDN 載入設 10 秒逾時，失敗時擲出錯誤由呼叫端處理。
 */

const STORAGE_KEY = 'hfp:lang'
const CDN_URLS = [
  'https://unpkg.com/opencc-js@1.0.5/dist/umd/full.js',
  'https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.js',
]
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA'])

const originals = new WeakMap()
let converter = null
let loading = null
let observer = null
let current = 'hant'

export function getLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'hans' ? 'hans' : 'hant'
  } catch {
    return 'hant'
  }
}

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} 逾時（${ms}ms）`)), ms),
    ),
  ])
}

async function ensureConverter() {
  if (converter) return

  loading = (async () => {
    let lastError = new Error('未知錯誤')
    for (const url of CDN_URLS) {
      try {
        await withTimeout(import(/* @vite-ignore */ url), 10000, `載入 ${url}`)
        if (typeof window.OpenCC === 'undefined') {
          throw new Error('OpenCC 全域物件未出現')
        }
        converter = window.OpenCC.Converter({ from: 'tw', to: 'cn' })
        return
      } catch (error) {
        lastError = error
      }
    }
    throw lastError
  })()

  try {
    await loading
  } finally {
    // loading 保留 resolved/rejected 狀態，避免重複嘗試；失敗時允許重試
    loading.catch(() => {})
    if (!converter) loading = null
  }
}

function convertText(text) {
  const converted = converter(text)
  // 防迴圈：轉換結果相同就不寫入（不觸發 MutationObserver）
  return converted === text ? text : converted
}

function walkAndConvert(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT
      const parent = node.parentElement
      if (!parent || SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  applying = true
  let node = walker.nextNode()
  while (node) {
    if (!originals.has(node)) originals.set(node, node.nodeValue)
    const converted = convertText(originals.get(node))
    if (converted !== node.nodeValue) node.nodeValue = converted
    node = walker.nextNode()
  }
  applying = false
}

function restore(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  applying = true
  let node = walker.nextNode()
  while (node) {
    if (originals.has(node)) node.nodeValue = originals.get(node)
    node = walker.nextNode()
  }
  applying = false
}

function startObserver() {
  if (observer) return
  observer = new MutationObserver((mutations) => {
    if (applying || current !== 'hans') return
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        const target = mutation.target
        if (!target.nodeValue || !target.nodeValue.trim()) continue
        if (SKIP_TAGS.has(target.parentElement?.tagName)) continue
        if (!originals.has(target)) originals.set(target, target.nodeValue)
        const converted = convertText(originals.get(target))
        if (converted !== target.nodeValue) target.nodeValue = converted
      } else if (mutation.type === 'childList') {
        for (const added of mutation.addedNodes) {
          if (added.nodeType === Node.TEXT_NODE) {
            if (!added.nodeValue || !added.nodeValue.trim()) continue
            if (!originals.has(added)) originals.set(added, added.nodeValue)
            const converted = convertText(originals.get(added))
            if (converted !== added.nodeValue) added.nodeValue = converted
          } else if (added.nodeType === Node.ELEMENT_NODE) {
            walkAndConvert(added)
          }
        }
      }
    }
  })
  observer.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  })
}

function stopObserver() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

export async function setLang(next) {
  if (next === current) return current

  if (next === 'hans') {
    await ensureConverter() // 可能擲出錯誤（CDN 失敗）
    current = next
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    startObserver()
    applying = false
    walkAndConvert(document.body)
    const titleKey = 'document:title'
    if (!originals.has(titleKey)) originals.set(titleKey, document.title)
    document.title = convertText(document.title)
  } else {
    current = next
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    stopObserver()
    applying = false
    restore(document.body)
    const titleKey = 'document:title'
    if (originals.has(titleKey)) document.title = originals.get(titleKey)
  }
  return current
}
