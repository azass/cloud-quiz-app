import { useQuery } from 'react-query'
import axios from 'axios'
import { Tag, Term } from '../types/types'

export const useQueryTerms = (tag?: Tag) => {
  const getTerms = async () => {
    const { data } = await axios.get<Term[]>(
      `${process.env.REACT_APP_REST_URL}/keywords?provider=${tag?.provider}&tag_no=${tag?.tag_no}`
    )
    return data
  }
  return useQuery<Term[], Error>({
    queryKey: tag?.provider + '_' + tag?.tag_no,
    queryFn: getTerms,
    staleTime: 300,
  })
}
