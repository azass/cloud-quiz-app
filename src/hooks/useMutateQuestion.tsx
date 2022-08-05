import axios from 'axios'
import { useQueryClient } from 'react-query'
import { Question } from '../types/types'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const useMutateQuestion = () => {
  const queryClient = useQueryClient()

  const createQuestion = (question: Question) => {
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
              question.exam_id,
              previousQuestions.map((quest) =>
                quest.quest_id === question.quest_id ? question : quest
              )
            )
          }
        }
      })
      .catch((error) => console.log(error))
  }

  const updateQuestion = (question: Question) => {
    axios.put(`${process.env.REACT_APP_REST_URL}/question`, question, config)
      .then((response) => {
        queryClient.setQueryData<Question>(
          question.quest_id, question
        )
      }).catch((error) => console.log(error))
  }

  const putQuestion = (requestData: any, question: Question, post?: any) => {
    axios.put(`${process.env.REACT_APP_REST_URL}/question`, requestData, config)
      .then((response) => {
        queryClient.setQueryData<Question>(
          question.quest_id, question
        )
        if (post) post({ ...question })
      }).catch((error) => console.log(error))
  }

  const deleteBug = (question: Question) => {
    const requestData: Question = {
      quest_id: question.quest_id,
      is_bug: question.is_bug
    }
    axios.put(`${process.env.REACT_APP_REST_URL}/question`, requestData, config)
      .then((response) => {
        queryClient.setQueryData<Question>(
          question.quest_id, question
        )
      }).catch((error) => console.log(error))
  }

  return {
    createQuestion,
    updateQuestion,
    putQuestion,
    deleteBug
  }
}
