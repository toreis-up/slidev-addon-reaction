<script setup lang="ts">
import { toDataURL } from 'qrcode'
import { ref, watch } from 'vue';
import { useDarkMode } from '@slidev/client'

const { isDark } = useDarkMode()

const qrCodeString = ref('');

const { text } = defineProps({ text: { type: String, required: true } })

watch(isDark, async () => {
  const foregroundValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--slidev-code-foreground')
    .trim()
  const backgroundValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--slidev-code-background')
    .trim()
  qrCodeString.value = await toDataURL(text, { color: { light: backgroundValue, dark: foregroundValue } })
}, { immediate: true })
</script>

<template>
  <img :src="qrCodeString" />
</template>
