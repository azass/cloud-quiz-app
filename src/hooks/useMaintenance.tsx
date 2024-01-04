import axios from 'axios'
import { Exam } from '../types/types'
import Prop from '../consts/props'
import { useState } from 'react'

export const useMaintenance = () => {
  const [doing, setDoing] = useState(false)
  const setupReportItem = (exam: Exam) => {
    setDoing(true)
    const requestData = {
      Method: 'setupReportItemBatch',
      Args: {
        provider: exam.provider,
        exam_id: exam.exam_id,
      },
    }
    axios
      .post(
        `${process.env.REACT_APP_REST_URL}/maintenance`,
        requestData,
        Prop.config
      )
      .then((response) => {
        let result = response.data
        console.log(result)
        setDoing(false)
      })
      .catch((error) => {
        console.log(error)
        setDoing(false)
      })
  }

  return {
    setupReportItem,
    doing,
  }
}
