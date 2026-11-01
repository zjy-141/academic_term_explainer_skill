<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <svg
    class="glyph"
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    stroke-width="1.2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- 01 术语提取：文稿 + 高亮行 + 扫描线 -->
    <template v-if="name === 'extract'">
      <g class="glyph__ring">
        <circle cx="60" cy="60" r="52" stroke-dasharray="2 8" />
      </g>
      <g class="glyph__icon">
        <rect x="36" y="26" width="48" height="68" rx="7" />
        <path d="M46 42h18M46 52h28M46 62h22M46 72h12" />
        <path class="glyph__accent" d="M46 52h28M46 62h22" stroke-width="1.9" />
        <path class="glyph__scan" d="M24 47h72" stroke-dasharray="3 5" opacity="0.75" />
      </g>
    </template>

    <!-- 02 学科路由：一个中心节点分叉到三个学科 -->
    <template v-else-if="name === 'route'">
      <g class="glyph__ring">
        <path d="M60 10a50 50 0 0 1 0 100" stroke-dasharray="3 9" />
        <path d="M60 22a38 38 0 0 0 0 76" stroke-dasharray="3 9" opacity="0.45" />
      </g>
      <g class="glyph__icon">
        <circle cx="60" cy="60" r="10" />
        <path d="M52 53 40 41M52 67 40 79M70 60h11" />
        <circle cx="36" cy="37" r="4.5" />
        <circle cx="36" cy="83" r="4.5" />
        <circle class="glyph__accent" cx="85" cy="60" r="4.5" stroke-width="1.7" />
      </g>
    </template>

    <!-- 03 联网检索：地球 + 检索点 -->
    <template v-else-if="name === 'search'">
      <g class="glyph__ring">
        <circle cx="60" cy="60" r="52" stroke-dasharray="1 9" />
        <circle cx="60" cy="60" r="43" stroke-dasharray="1 13" opacity="0.5" />
      </g>
      <g class="glyph__icon">
        <circle cx="57" cy="59" r="24" />
        <ellipse cx="57" cy="59" rx="11" ry="24" />
        <path d="M33 59h48M39 47h36M39 71h36" />
        <circle class="glyph__accent" cx="80" cy="38" r="6.5" stroke-width="1.7" />
      </g>
    </template>

    <!-- 04 模块拼装：六边形里的四个模块，其中一块高亮 -->
    <template v-else-if="name === 'assemble'">
      <g class="glyph__ring">
        <path d="M60 8 105 34v52L60 112 15 86V34z" stroke-dasharray="3 8" />
      </g>
      <g class="glyph__icon">
        <rect x="34" y="40" width="22" height="18" rx="4" />
        <rect class="glyph__accent" x="64" y="40" width="22" height="18" rx="4" stroke-width="1.7" />
        <rect x="34" y="62" width="22" height="18" rx="4" />
        <rect x="64" y="62" width="22" height="18" rx="4" />
      </g>
    </template>

    <!-- 05 递归解释：一个主节点与两个次级节点 -->
    <template v-else-if="name === 'recurse'">
      <g class="glyph__ring">
        <path d="M60 8 112 60 60 112 8 60z" stroke-dasharray="3 8" />
      </g>
      <g class="glyph__icon">
        <circle cx="60" cy="36" r="9" />
        <path d="M54 43 40 72M66 43 80 72" />
        <circle class="glyph__accent" cx="36" cy="80" r="7.5" stroke-width="1.7" />
        <circle cx="84" cy="80" r="7.5" />
      </g>
    </template>

    <!-- 06 输出降级：逐级下降的阶梯 -->
    <template v-else-if="name === 'fallback'">
      <g class="glyph__ring">
        <circle cx="60" cy="60" r="52" stroke-dasharray="3 9" />
      </g>
      <g class="glyph__icon">
        <path d="M30 42h15v13h15v13h15v13h15" />
        <circle cx="30" cy="42" r="3.5" />
        <circle class="glyph__accent" cx="90" cy="81" r="4" stroke-width="1.7" />
      </g>
    </template>

    <!-- 07 引用核对：文稿 + 勾 -->
    <template v-else-if="name === 'cite'">
      <g class="glyph__ring">
        <circle cx="60" cy="60" r="52" stroke-dasharray="2 8" />
        <circle cx="60" cy="60" r="44" opacity="0.35" />
      </g>
      <g class="glyph__icon">
        <rect x="36" y="28" width="44" height="58" rx="7" />
        <path d="M45 44h18M45 54h26M45 64h16" />
        <path class="glyph__accent" d="M58 76l6 6 13-13" stroke-width="2" />
      </g>
    </template>

    <!-- 兜底：一个空心圆 -->
    <template v-else>
      <g class="glyph__ring">
        <circle cx="60" cy="60" r="52" stroke-dasharray="2 8" />
      </g>
    </template>
  </svg>
</template>

<style scoped>
.glyph {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

.glyph__accent {
  stroke: var(--link-dark);
}
</style>
