import { useReaction } from "./useReaction";
import { useRoom } from "./useRoom";

const { addReaction } = useReaction();
const { reactions } = useRoom()

function getRandomReaction() {
  const id = (Math.random() * 100 % reactions.value.length) | 0

  return reactions.value[id].name;
}

export function useLocalConnector() {
  async function startConnection() {
    console.debug('Connecting...')

    const connector = await new Promise((res, rej) => setTimeout(() => res(true), 2000))

    if (connector) {
      console.debug('Established')
    }

    setInterval(() => addReaction(getRandomReaction()), 120)
  }



  return {
    startConnection
  }
}
