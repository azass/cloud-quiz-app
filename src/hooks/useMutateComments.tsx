import axios from 'axios'
import { useQueryClient } from 'react-query'
import { Comments, Comment, NoteItem } from '../types/types'
import Prop from '../consts/props'

export const useMutateComments = () => {
  const queryClient = useQueryClient()

  const putComments = (
    quest_id: string,
    comment_items: Comment[],
    answer_items: NoteItem[],
    title: string
  ) => {
    const requestData = {
      quest_id: quest_id,
      comment_items: comment_items,
      answer_items: answer_items,
      title: title
    }
    const comments: Comments = {
      comment_items,
      answer_items,
    }
    axios
      .put(
        `${process.env.REACT_APP_REST_URL}/comments`,
        requestData,
        Prop.config
      )
      .then((response) => {
        queryClient.setQueryData<Comments>('comments:' + quest_id, comments)
      })
      .catch((error) => console.log(error))
  }

  return {
    putComments,
  }
}
