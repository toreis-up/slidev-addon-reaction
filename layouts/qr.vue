<script setup lang="ts">
import Qr from '../components/qr.vue'
import { useRoom } from '../composables/useRoom';
import { useWorkerConnector } from '../composables/useWorkerConnector';

const { roomId } = useRoom()
const { host } = useWorkerConnector()
</script>

<template>
  <div class="h-full my-auto flex mr-5">
    <div class="slidev-layout cover my-auto flex-auto">
      <div class="my-auto w-full">
        <slot />
      </div>
    </div>
    <div class="my-auto flex-none">
      <Qr :room-id="roomId" :host="host" />
    </div>
  </div>
</template>
