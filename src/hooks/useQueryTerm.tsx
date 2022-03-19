import { useQuery } from 'react-query'
import axios from 'axios'
import { Term } from '../types/types'

export const useQueryTerm = (term: Term) => {
  const getTerm = async () => {
    const { data } = await axios.get<Term>(
      `${process.env.REACT_APP_REST_URL}/term?term_id=${term.term_id}`
    )
    return data
  }
  return useQuery<Term, Error>({
    queryKey: term.term_id,
    queryFn: getTerm,
    staleTime: 300,
  })
}
