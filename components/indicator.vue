<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

import { useRoom } from '../composables/useRoom';
import { useReaction } from '../composables/useReaction';

const { name } = defineProps<{ name: string }>()

const { reactions, removeReaction } = useReaction()
const { reactionToEmoji } = useRoom()

const solvedIconName = computed(() => {
  return reactionToEmoji(name)
})

const bubbles = computed(() => reactions.value[name])

const removeBubble = (id: number) => {
  removeReaction(id, name)
}

</script>

<template>
  <div class="relative inline-flex items-center justify-center leading-none text-2xl">
    <Icon :icon="solvedIconName" class="text-xl" />
    <div class="absolute -inset-2 border-1 border-dark rounded-full" />
    <div v-for="bubble in bubbles" :key="bubble.id">
      <Icon :icon="solvedIconName" class="text-xl bubble"
        :style="{ '--drift-x': `${bubble.driftX}px`, '--duration': `${bubble.duration}`, '--rise-y': '80', '--offset': `${bubble.offset - 0.5}` }"
        @animationend="removeBubble(bubble.id)" />
    </div>
  </div>
</template>

<style scoped>
.bubble {
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0;
  font-size: 24px;
  line-height: 1;
  animation: bubble-float calc(var(--duration) * 1ms) linear forwards;
}

@keyframes bubble-float {
  0% {
    opacity: 0;
    transform: translateX(calc(var(--offset)*8px)) translateY(0);
  }

  15% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateX(calc(var(--offset)*8px)) translateY(calc(var(--rise-y) * -1px));
  }
}
</style>
