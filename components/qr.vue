<script setup lang="ts">
import qrImage from './qrImage.vue';

const { roomId } = defineProps({
  roomId: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col w-fit items-center border-2 pa-2 rounded-md">
    <div class="my-2">
      <div class="text-lg">
        {{ host }}
      </div>
    </div>
    <div class="border-4 rounded-md my-2">
      <qrImage :text="`${host}/${roomId}`" />
    </div>
    <div class="text-xl my-2">
      {{ roomId }}
    </div>
  </div>
</template>
