import { useQuery } from 'react-query'
import axios from 'axios'
import { Question } from '../types/types'

export const useQueryQuestions = (args:any) => {
  const getQuestions = async () => {
    console.log(">>>>getQuestions")
    const condition = {
      Method: "SEARCH_QUESTIONS",
      Args: args
    }
    const { data } = await axios.post<Question[]>(
      `${process.env.REACT_APP_REST_URL}/dynamodbctrl`, condition
    )
    return data
  }
  return useQuery<Question[], Error>({
    queryKey: args.exam_ids[0],
    queryFn: getQuestions,
    staleTime: 300,
    refetchOnWindowFocus: true,
  })
}