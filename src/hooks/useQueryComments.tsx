import { useQuery } from 'react-query'
import axios from 'axios'
import { Comment, Comments } from '../types/types'

export const useQueryComments = (quest_id: string) => {
  const getComments = async () => {
    const { data } = await axios.get<Comments>(
      `${process.env.REACT_APP_REST_URL}/comments?quest_id=${quest_id}`
    )
    return data
  }
  return useQuery<Comments, Error>({
    queryKey: 'comments:' + quest_id,
    queryFn: getComments,
    // staleTime: 300,
  })
}
