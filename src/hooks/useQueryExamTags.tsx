import { useQuery } from 'react-query'
import axios from 'axios'
import { Exam, Tag } from '../types/types'

export const useQueryExamTags = (exam: Exam) => {
  const getExamTags = async () => {
    const { data } = await axios.get<Tag[]>(
      `${process.env.REACT_APP_REST_URL}/get_tags?provider=${exam.provider}&exam_id=${exam.exam_id}`
    )
    return data
  }
  return useQuery<Tag[], Error>({
    queryKey: exam.exam_id,
    queryFn: getExamTags,
  })
}
