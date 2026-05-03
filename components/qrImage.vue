<script setup lang="ts">
import { renderSVG } from 'uqr'
import { ref, watch } from 'vue';
import { useDarkMode } from '@slidev/client'

const { isDark } = useDarkMode()

const qrSvg = ref('');

const { text } = defineProps({ text: { type: String, required: true } })

watch(isDark, async () => {
  const foregroundValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--slidev-code-foreground')
    .trim()
  const backgroundValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--slidev-code-background')
    .trim()

  qrSvg.value = renderSVG(text, {
    blackColor: foregroundValue,
    whiteColor: backgroundValue,
    border: 4,
    pixelSize: 8
  })
}, { immediate: true })
</script>

<template>
  <div v-html="qrSvg" class="qr-image" />
</template>

<style scoped>
.qr-image :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
