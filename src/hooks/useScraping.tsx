import axios from 'axios'
import { useState } from 'react'
import { Question } from '../types/types'
import { useMutateQuestion } from './useMutateQuestion'
import { useMutateComments } from './useMutateComments'
import Prop from '../consts/props'

export const useScraping = (question: Question, setQuestion: any) => {
  const { updateQuestion } = useMutateQuestion()
  const [showFlg, setShowFlg] = useState(false)
  const [html, setHtml] = useState('')
  const { putComments } = useMutateComments()
  const onChange = (text: string) => {
    setHtml(text)
  }
  const onClick = (questId: string) => {
    const requestData = {
      data: html,
    }
    axios
      .post(
        `${process.env.REACT_APP_REST_URL}/scraping`,
        requestData,
        Prop.config
      )
      .then((response) => {
        let result = response.data
        console.log(result)
        console.log(questId)
        const newQuestion = {
          ...question,
          question_items: result['question_items'],
          options: result['options'],
        }
        // if (questId === 'new') {
        updateQuestion(newQuestion)
        putComments(question.quest_id, result['comments'], result['answers'])
        setQuestion(newQuestion)
        // }
      })
      .catch((error) => console.log(error))
  }

  return {
    showFlg,
    setShowFlg,
    onChange,
    onClick,
  }
}
