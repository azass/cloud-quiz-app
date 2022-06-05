import { useQuery } from 'react-query'
import axios from 'axios'
import { Question } from '../types/types'
import log from 'loglevel'

export const useQueryQuestions = (args: any) => {
  log.setLevel("info")
  const getQuestions = async () => {
    log.debug(">>>>getQuestions")
    const condition = {
      Method: "SEARCH_QUESTIONS",
      Args: args
    }
    const { data } = await axios.post<Question[]>(
      `${process.env.REACT_APP_REST_URL}/dynamodbctrl`, condition
    )
    log.debug(data)
    return data
  }
  return useQuery<Question[], Error>({
    queryKey: args.exam_ids[0],
    queryFn: getQuestions,
    // staleTime: 300,
    // refetchOnWindowFocus: true,
  })
}