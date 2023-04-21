import { useQuery } from 'react-query'
import axios from 'axios'
import { Question } from '../types/types'
import log from 'loglevel'

export const useQueryQuestions = (args: any) => {
  log.setLevel('debug')
  const getQuestions = async () => {
    log.debug('>>>>getQuestions')
    const condition = {
      Method: 'SEARCH_QUESTIONS',
      Args: args,
    }
    const { data } = await axios.post<Question[]>(
      `${process.env.REACT_APP_REST_URL}/questions`,
      condition
    )
    log.debug(data)
    return data
  }
  return useQuery<Question[], Error>({
    queryKey: 'Questions' + args.exam_ids[0],
    // queryKey: args.exam_ids[0] + JSON.stringify(args),
    queryFn: getQuestions,
    // staleTime: 300000,
    // refetchOnWindowFocus: true,
  })
}
