import axios from 'axios'
import { useState } from 'react'

export const useScraping = (setQuestion: any) => {
  const [showFlg, setShowFlg] = useState(false)
  const [html, setHtml] = useState('')
  const onChange = (text: string) => {
    setHtml(text)
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const onClick = (questId: string) => {
    const requestData = {
      data: html,
    }
    axios
      .post(`${process.env.REACT_APP_REST_URL}/scraping`, requestData, config)
      .then((response) => {
        let result = response.data
        console.log(result)
        console.log(questId)
        if (questId === 'new') {
          setQuestion(result)
        }
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
