import axios from 'axios'
import { useQuery } from 'react-query'
import { ProgressState } from '../types/types'

export const useQueryProgressState = (exam_id: string) => {
  const method = 'PRACTICE_STATE'
  const getPracticeState = async () => {
    const { data } = await axios.get<ProgressState>(
      `${process.env.REACT_APP_REST_URL}/questions?Method=${method}&exam_id=${exam_id}`
    )
    return data
  }
  return useQuery<ProgressState, Error>({
    queryKey: method,
    queryFn: getPracticeState,
    // staleTime: Infinity,
    cacheTime: 0,
  })
}
