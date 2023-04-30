import { FC, useEffect, useState } from 'react'
import { useEditQuestionContext } from './EditQuestionHeader'
import { useQuestionContext } from './QuestionProvider'
import { strongText } from '../../../../styles/util'

export const QScreenTime: FC = () => {
  const [time, setTime] = useState(0)
  // const [isRunning, setIsRunning] = useState(false)
  const { question } = useQuestionContext()
  const { questId } = useEditQuestionContext()
  if (questId !== question.quest_id) {
    setTime(0)
  }
  const hours = Math.floor(time / 360000)
  const minutes = Math.floor((time % 360000) / 6000)
  const seconds = Math.floor((time % 6000) / 100)
  useEffect(() => {
    // let intervalId;
    // if (isRunning) {
    let intervalId = setInterval(() => setTime(time + 1), 10)
    // }
    return () => clearInterval(intervalId)
  }, [time])
  const zero = (num: number) => {
    return num.toString().padStart(2, '0')
  }
  return (
    <div className={`flex mt-2 mx-2 px-4 ${strongText}`}>
      <span>
        {zero(hours)}:{zero(minutes)}:{zero(seconds)}
      </span>
    </div>
  )
}
