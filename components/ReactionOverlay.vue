<script lang="ts" setup>
import indicator from './indicator.vue';
import { useSlideContext } from '@slidev/client'

import { useWorkerConnector } from '../composables/useWorkerConnector';
const { startConnection, isConnected } = useWorkerConnector()

import { useRoom } from '../composables/useRoom';
import { onMounted, computed } from 'vue';

const { reactions } = useRoom()
onMounted(async () => {
  await startConnection()
})

const { $slidev } = useSlideContext()

const currentFrontmatter = computed(() => {
  return $slidev.nav.currentSlideRoute.meta.slide.frontmatter
})

const reactionsDisabled = computed(() => {
  const r = currentFrontmatter.value?.reaction
  return isConnected && (r === true || (typeof r === 'object' && r !== null && r.disable))
})

const reactionsStyle = computed(() => {
  if (reactionsDisabled.value)
    return 'opacity: 0;'
  else return ''
})
</script>

<template>
  <div class="pointer-events-none overflow-none" :style="reactionsStyle">
    <div class="flex items-center gap-x-6">
      <div v-for="reaction in reactions" :key="reaction.name">
        <indicator :name="reaction.name" />
      </div>
    </div>
  </div>
</template>
