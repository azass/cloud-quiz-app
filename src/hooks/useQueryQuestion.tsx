/* eslint-disable no-throw-literal */
import { useQuery } from 'react-query'
import axios from 'axios'
import { Question } from '../types/types'
import { useAppSelector } from '../app/hooks'
import { selectIdToken } from '../slices/editSlice'

export const useQueryQuestion = (questId: string) => {
  const idToken = useAppSelector(selectIdToken)
  const getQuestion = async () => {
    try {
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
      if (question) {
        question.options?.map((option) => {
          if (!('mark' in option)) { // 連想配列キーの存在チェック
            const mark = option.text?.slice(0, 1) || ''
            option.mark = mark
          }
          option.correct = question.correct_answer?.includes(option.mark || '_')
        })
        question.keywords = JSON.stringify(question.keywords)
      }
      return question
    } catch (error: any) {
      console.log(error)
      throw {
        code: error.code,
        message: error.response.data,
        responseStatus: error.response?.status
      };
    }
  }
  return useQuery<Question, Error>({
    queryKey: questId,
    queryFn: getQuestion,
    staleTime: 300,
  })
}
