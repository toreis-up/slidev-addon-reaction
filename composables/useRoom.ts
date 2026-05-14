import { ref } from 'vue'
import { useSessionStorage } from '@vueuse/core'

const roomId = useSessionStorage('room-id', '')
const roomIdValidTo = useSessionStorage('room-id-valid-by', 0)
const reactions = ref<Array<{ name: string, emojiName: string }>>([])

const defaultReactions = [{ name: '+1', emojiName: 'twemoji:thumbs-up' }, { name: 'ex', emojiName: 'twemoji:exclamation-question-mark' }, { name: 'cat', emojiName: 'twemoji:kissing-cat' }, { name: 'clap', emojiName: 'twemoji:clapping-hands' }]

const roomIdPattern = /^[0-9]{8}/;

function isRoomIdValid() {
  const isValidId = roomIdPattern.test(roomId.value)
  const isValidTo = roomIdValidTo.value > Date.now()
  return isValidTo && isValidId
}

export function useRoom() {
  async function createNewRoom(host: string) {
    if (isRoomIdValid()) return

    const createRoomResult = await (await fetch(`http://${host}/api/rooms`, { body: JSON.stringify({ configuration: defaultReactions }), method: 'POST' })).json()
    if (!createRoomResult.ok) {
      return
    }

    roomId.value = await createRoomResult.room.roomId
    roomIdValidTo.value = Date.now() + 1000 * 60 * 60 * 2
    reactions.value = await createRoomResult.room.configuration
  }

  function reactionToEmoji(reactionName: string) {
    return reactions.value.find(reaction => reaction.name === reactionName)?.emojiName ?? reactionName
  }


  return {
    createNewRoom,
    roomId,
    reactions,
    reactionToEmoji,
  }
}
