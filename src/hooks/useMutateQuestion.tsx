import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { useQueryClient, useMutation } from 'react-query'
import { Question } from '../types/types'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const useMutateQuestions = () => {
  const createQuestion = (question: Question) => {
    const queryClient = useQueryClient()
    axios
      .post(`${process.env.REACT_APP_REST_URL}/question`, question, config)
      .then((response) => {
        let result = response.data
        console.log(result)
        if (question.exam_id) {
          const previousQuestions = queryClient.getQueryData<Question[]>(
            question.exam_id
          )
          if (previousQuestions) {
            queryClient.setQueryData<Question[]>(
              question.exam_id || '',
              previousQuestions.map((quest) =>
                quest.quest_id === question.quest_id ? question : quest
              )
            )
          }
        }
      })
      .catch((error) => console.log(error))
  }
}
