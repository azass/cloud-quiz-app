import axios from 'axios'
import { useQueryClient } from 'react-query'
import { Question, voidTag } from '../types/types'
import Prop from '../consts/props'
import {
  selectIdToken,
  selectQuestions,
  setEditContext,
  setQuestions,
} from '../slices/editSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'

export const useMutateQuestion = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const idToken = useAppSelector(selectIdToken)
  const questions = useAppSelector<Question[]>(selectQuestions)

  const createQuestion = (question: Question) => {
    axios
      .post(`${process.env.REACT_APP_REST_URL}/question`, question, Prop.config)
      .then((response) => {
        let result = response.data
        console.log(result)
        if (question.exam_id) {
          const previousQuestions = queryClient.getQueryData<Question[]>(
            'Questions' + question.exam_id
          )
          dispatch(setQuestions([...questions, question]))
          if (previousQuestions) {
            const newQuestions = [...previousQuestions, question]
            queryClient.setQueryData<Question[]>(
              'Questions' + question.exam_id,
              newQuestions
            )
          }
          dispatch(
            setEditContext({
              quest_id: question.quest_id,
              keywordsJson: question.keywords || '',
              chosenTag: voidTag,
              forQuestion: true,
            })
          )
        }
      })
      .catch((error) => console.log(error))
  }

  const updateQuestion = (question: Question) => {
    axios
      .put(`${process.env.REACT_APP_REST_URL}/question`, question, Prop.config)
      .then((response) => {
        // queryClient.setQueryData<Question>(question.quest_id, question)
      })
      .catch((error) => console.log(error))
  }

  const putQuestion = (requestData: any, question: Question, post?: any) => {
    axios
      .put(
        `${process.env.REACT_APP_REST_URL}/question`,
        requestData,
        Prop.config
      )
      .then((response) => {
        queryClient.setQueryData<Question>(question.quest_id, question)
        dispatch(
          setQuestions(
            questions.map((quest) =>
              quest.quest_id === requestData.quest_id
                ? {
                    ...quest,
                    keywords: question.keywords,
                    labels: question.labels,
                  }
                : quest
            )
          )
        )
        if (question.exam_id) {
          const previousQuestions = queryClient.getQueryData<Question[]>(
            'Questions' + question.exam_id
          )
          if (previousQuestions) {
            const newQuestions = [...previousQuestions, question]
            queryClient.setQueryData<Question[]>(
              'Questions' + question.exam_id,
              newQuestions
            )
          }
          dispatch(
            setEditContext({
              quest_id: question.quest_id,
              keywordsJson: question.keywords || '',
              chosenTag: voidTag,
              forQuestion: true,
            })
          )
        }
        if (post) post({ ...question })
      })
      .catch((error) => console.log(error))
  }

  const putQuestionSync = (
    requestData: any,
    question: Question,
    post?: any
  ) => {
    axios
      .put(
        `${process.env.REACT_APP_REST_URL}/question`,
        requestData,
        Prop.config
      )
      .then(async (response) => {
        const headers = {
          headers: {
            Authorization: idToken,
          },
        }
        const { data } = await axios.get(
          `${process.env.REACT_APP_REST_URL}/question?quest_id=${question.quest_id}`,
          headers
        )
        const newQuestion: Question = data.body
        if (newQuestion) {
          newQuestion.options?.map((option) => {
            if (!('mark' in option)) {
              // 連想配列キーの存在チェック
              const mark = option.text?.slice(0, 1) || ''
              option.mark = mark
            }
            option.correct = question.correct_answer?.includes(
              option.mark || '_'
            )
          })
          newQuestion.keywords = JSON.stringify(newQuestion.keywords)
          post(newQuestion)
        }
      })
      .catch((error) => console.log(error))
  }

  const deleteBug = (question: Question) => {
    const requestData: Question = {
      quest_id: question.quest_id,
      is_bug: question.is_bug,
    }
    axios
      .put(
        `${process.env.REACT_APP_REST_URL}/question`,
        requestData,
        Prop.config
      )
      .then((response) => {
        queryClient.setQueryData<Question>(question.quest_id, question)
      })
      .catch((error) => console.log(error))
  }

  return {
    createQuestion,
    updateQuestion,
    putQuestionSync,
    putQuestion,
    deleteBug,
  }
}
