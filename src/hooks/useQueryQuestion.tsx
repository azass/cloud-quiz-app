import { useQuery } from 'react-query'
import axios from 'axios'
import { Question } from '../types/types'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { useAppSelector } from '../app/hooks'
import { selectIdToken, setIdToken } from '../slices/editSlice'

export const useQueryQuestion = (questId: string) => {
  const idToken = useAppSelector(selectIdToken)
  const getQuestion = async () => {
    console.log('useQueryQuestion.getQuestion')
    console.log(idToken)
    const headers = {
      headers: {
        Authorization: idToken,
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_REST_URL}/question?quest_id=${questId}`,
      headers
    )
    const question: Question = data.body
    question.options?.map((option) => {
      if (!('mark' in option)) {
        const mark = option.text?.slice(0, 1) || ''
        option.mark = mark
      }
      option.correct = data.correct_answer?.includes(option.mark || '_')
    })
    console.log('getQuestion')
    console.log(question)
    return question
  }
  return useQuery<Question, Error>({
    queryKey: questId,
    queryFn: getQuestion,
    staleTime: 300,
  })
}
