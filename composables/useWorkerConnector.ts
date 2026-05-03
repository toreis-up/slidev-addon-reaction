import { useReaction } from "./useReaction"
import { useRoom } from "./useRoom"

import { useSlideContext } from '@slidev/client'
import { useWebSocket } from '@vueuse/core'
import { computed } from "vue"

const { addReaction } = useReaction();
const { roomId, createNewRoom } = useRoom()

let webSocket: WebSocket | null = null
export function useWorkerConnector() {
  const { $slidev } = useSlideContext()

  async function startConnection() {
    await createNewRoom(host.value)
    useWebSocket(`ws://${host.value}/api/rooms/${roomId.value}/ws`, {
      onConnected: (ws) => { webSocket = ws },
      onMessage: (ws, event) => onReaction(JSON.parse(event.data).reactionName),
      onError: (ws, event) => { webSocket = null }
    })

  }

  async function closeConnection() {
    if (!webSocket) return;

    webSocket.close()
  }

  async function onReaction(reactionName: string) {
    addReaction(reactionName)
  }

  const host = computed(() => {
    return $slidev.configs.reaction?.host ?? 'localhost:8787'
  })

  const isConnected = computed(() => !!webSocket)

  return {
    startConnection,
    closeConnection,
    host,
    isConnected
  }
}
