import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './useSiteMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * 把「滚动进度」映射为当前活跃场景序号。
 * 参考页的产品视窗、屏幕触控等区块都用这种粘性 + 进度切换的做法。
 */
export function useSceneProgress(
  triggerRef: Ref<HTMLElement | null>,
  count: number,
  options: { start?: string; end?: string } = {},
) {
  const active = ref(0)
  let st: ScrollTrigger | null = null

  onMounted(() => {
    const el = triggerRef.value
    if (!el || count < 1) return

    if (prefersReducedMotion()) {
      active.value = 0
      return
    }

    st = ScrollTrigger.create({
      trigger: el,
      start: options.start ?? 'top top',
      end: options.end ?? 'bottom bottom',
      onUpdate: (self) => {
        const idx = Math.min(count - 1, Math.max(0, Math.floor(self.progress * count * 0.999)))
        if (idx !== active.value) active.value = idx
      },
    })
  })

  onBeforeUnmount(() => {
    st?.kill()
    st = null
  })

  return { active }
}

/** 元素是否已进入视口（用于延迟加载重动画） */
export function useInView(threshold = 0.3) {
  const inView = ref(false)
  let observer: IntersectionObserver | null = null

  const observe = (el: HTMLElement | null) => {
    if (!el) return
    observer?.disconnect()
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          inView.value = true
          observer?.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
  }

  onBeforeUnmount(() => observer?.disconnect())

  return { inView, observe }
}
