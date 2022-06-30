import { useQuery } from 'react-query'
import axios from 'axios'
import { Tag } from '../types/types'

export const useQueryExamTags = (exam: any) => {
  const getExamTags = async () => {
    const { data } = await axios.get<Tag[]>(
      `${process.env.REACT_APP_REST_URL}/get_tags?provider=${exam.provider}&exam_id=${exam.examId}`
    )
    return data
  }
  return useQuery<Tag[], Error>({
    queryKey: exam.examId,
    queryFn: getExamTags,
    // staleTime: ,
  })
}
