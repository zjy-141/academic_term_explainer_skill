import gsap from 'gsap'

/** 是否处于「精简动效」模式（由 <html class="reduced-motion"> 决定） */
export const prefersReducedMotion = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('reduced-motion')

type Starter = () => void

/**
 * 站点级动效：用 data-* 声明。
 *
 * 用 IntersectionObserver 而不是 ScrollTrigger 驱动入场，原因：
 * ScrollTrigger 在 refresh（load / resize / 600ms 兜底）时会重置尚未播完的
 * from 动画，导致卡片停在半路——卡片网格会因此看起来“排歪了”。
 * IO 是单向触发，不存在这个问题。
 */
export function initSiteMotion() {
  const reduce = prefersReducedMotion()
  const starters = new Map<Element, Starter>()
  const tweens: gsap.core.Tween[] = []
  const hidden: HTMLElement[] = []

  const push = (tween: gsap.core.Tween) => {
    tweens.push(tween)
    return tween
  }

  // 1. 成组入场
  //
  // 卡片网格用 data-stagger="fade"：只淡入、不位移。
  // 原因是这些卡片自己带 CSS 悬停位移，若 GSAP 在入场时写了内联 transform，
  // 会同时接管悬停（CSS 规则失效），并且 CSS 过渡会把 GSAP 逐帧写入再平滑一次，
  // 看起来就"发涩"。纯淡入能让悬停位移完全由合成层处理。
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
    const items = Array.from(group.querySelectorAll<HTMLElement>('[data-stagger-item]'))
    if (!items.length) return
    const fadeOnly = group.dataset.stagger === 'fade'
    if (!reduce) {
      gsap.set(items, fadeOnly ? { autoAlpha: 0 } : { y: 28, autoAlpha: 0 })
      hidden.push(...items)
    }
    starters.set(group, () => {
      push(
        gsap.to(items, {
          ...(fadeOnly ? {} : { y: 0 }),
          autoAlpha: 1,
          duration: reduce ? 0.2 : fadeOnly ? 0.7 : 0.9,
          ease: 'power2.out',
          stagger: reduce ? 0 : fadeOnly ? 0.055 : 0.075,
          overwrite: 'auto',
        }),
      )
    })
  })

  // 2. 单元素淡入
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    if (!reduce) {
      gsap.set(el, { y: 28, autoAlpha: 0 })
      hidden.push(el)
    }
    starters.set(el, () => {
      push(
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: reduce ? 0.2 : 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        }),
      )
    })
  })

  // 3. 条形图增长
  gsap.utils.toArray<HTMLElement>('[data-bar]').forEach((el) => {
    if (reduce) {
      gsap.set(el, { scaleX: 1, transformOrigin: 'left center' })
      return
    }
    gsap.set(el, { scaleX: 0.02, transformOrigin: 'left center' })
    starters.set(el, () => {
      push(gsap.to(el, { scaleX: 1, duration: 1.1, ease: 'power3.out', overwrite: 'auto' }))
    })
  })

  // 4. 数字滚动
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count || 0)
    const decimals = Number(el.dataset.countDecimals || 0)
    if (reduce) {
      el.textContent = target.toFixed(decimals)
      return
    }
    starters.set(el, () => {
      const obj = { v: 0 }
      push(
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals)
          },
        }),
      )
    })
  })

  const observer =
    typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              const start = starters.get(entry.target)
              starters.delete(entry.target)
              observer?.unobserve(entry.target)
              start?.()
            })
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0 },
        )

  if (observer) {
    starters.forEach((_, el) => observer.observe(el))
  } else {
    // 极老浏览器：直接落地到终态
    starters.forEach((start) => start())
    starters.clear()
  }

  return () => {
    observer?.disconnect()
    starters.clear()
    tweens.forEach((t) => t.kill())
    if (!reduce) {
      gsap.set(hidden, { clearProps: 'transform,opacity,visibility' })
    }
  }
}
