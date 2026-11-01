import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** 是否处于「精简动效」模式（由 <html class="reduced-motion"> 决定） */
export const prefersReducedMotion = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('reduced-motion')

/** 站点级动效：用 data-* 声明，一次注册即可 */
export function initSiteMotion() {
  const reduce = prefersReducedMotion()

  const ctx = gsap.context(() => {
    // 精简模式下不做位移，只保留极短的淡入，避免“两态跳变”
    const enter = reduce
      ? { autoAlpha: 0, duration: 0.2, ease: 'none' as const }
      : { y: 28, autoAlpha: 0, duration: 0.9, ease: 'power2.out' as const }

    // 1. 成组淡入上移
    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
      const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]')
      if (!items.length) return
      gsap.from(items, {
        ...enter,
        stagger: reduce ? 0 : 0.075,
        scrollTrigger: { trigger: group, start: 'top bottom-=12%', once: true },
      })
    })

    // 2. 单元素淡入
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        ...enter,
        scrollTrigger: { trigger: el, start: 'top bottom-=12%', once: true },
      })
    })

    // 3. 视差
    if (!reduce) {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const distance = Number(el.dataset.parallax || 12)
        gsap.to(el, {
          yPercent: distance,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }

    // 4. 条形图增长（宽度由模板写入 --bar-width）
    gsap.utils.toArray<HTMLElement>('[data-bar]').forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: reduce ? 1 : 0.02 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: reduce ? 0 : 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top bottom-=10%', once: true },
        },
      )
    })

    // 5. 数字滚动
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count || 0)
      const decimals = Number(el.dataset.countDecimals || 0)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: reduce ? 0 : 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top bottom-=12%', once: true },
        onUpdate: () => {
          el.textContent = obj.v.toFixed(decimals)
        },
      })
    })
  })

  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)
  const t = window.setTimeout(refresh, 600)

  return () => {
    window.clearTimeout(t)
    window.removeEventListener('load', refresh)
    ctx.revert()
  }
}
