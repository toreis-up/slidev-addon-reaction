import { ref } from 'vue'

const roomId = ref('')
const reactions = ref<Array<{ name: string, emojiName: string }>>([])

const defaultReactions = [{ name: '+1', emojiName: 'twemoji:thumbs-up' }, { name: 'ex', emojiName: 'twemoji:exclamation-question-mark' }, { name: 'cat', emojiName: 'twemoji:kissing-cat' }, { name: 'clap', emojiName: 'twemoji:clapping-hands' }]

export function useRoom() {
  async function createNewRoom(host: string) {
    const createRoomResult = await (await fetch(`http://${host}/api/rooms`, { body: JSON.stringify({ configuration: defaultReactions }), method: 'POST' })).json()
    if (!createRoomResult.ok) {
      return
    }

    roomId.value = await createRoomResult.room.roomId
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
