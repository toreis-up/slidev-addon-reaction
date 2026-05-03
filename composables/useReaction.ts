import { ReactionName } from "../types";
import { Ref, ref } from 'vue'

let id = 0;
const reactions: Ref<Record<ReactionName, Array<any>>> = ref({})

export function useReaction() {

  function addReaction(reaction: ReactionName) {
    reactions.value[reaction] = [...(reactions.value[reaction] || []), { id: id++, duration: 1500, driftX: 10, offset: Math.random() }]
  }

  const removeReaction = (_id: number, reactionCollection: ReactionName) => {
    reactions.value[reactionCollection] = reactions.value[reactionCollection].filter((bubble) => bubble.id !== _id)
  }

  return {
    reactions, addReaction, removeReaction
  }
}
