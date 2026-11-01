import { ref } from 'vue'

/** 立即体验 = 下载技能包（public/skill.zip） */
const SKILL_FILE = 'skill.zip'
const started = ref(false)
let timer = 0

export function useSkillDownload() {
  const href = `${import.meta.env.BASE_URL}${SKILL_FILE}`

  const onDownload = () => {
    started.value = true
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      started.value = false
    }, 2600)
  }

  return { href, filename: SKILL_FILE, started, onDownload }
}
