import { createApp } from 'vue'
import App from './App.vue'
import './styles/tokens.css'
import './styles/base.css'
import './styles/utilities.css'

/**
 * 动效偏好：默认完整动效（这是展示页，动画本身就是内容的一部分）。
 * 系统开启「减少动态效果」时，只有用户显式选择「精简」才关闭；页脚提供开关。
 */
const MOTION_KEY = 'atm-motion'
const saved = (() => {
  try {
    return localStorage.getItem(MOTION_KEY)
  } catch {
    return null
  }
})()

if (saved === 'reduced') {
  document.documentElement.classList.add('reduced-motion')
}

createApp(App).mount('#app')
