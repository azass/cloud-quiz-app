import axios from 'axios'
import { Exam } from '../types/types'
import Prop from '../consts/props'

export const useMaintenance = () => {
  const onClick = (exam: Exam) => {
    const requestData = {
      Method: 'setupReportItem',
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
      })
      .catch((error) => console.log(error))
  }

  return {
    onClick,
  }
}
