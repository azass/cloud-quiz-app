import { memo, FC } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectQuestions } from '../../../slices/editSlice'
import { useSelectExcludeDaysContext } from './SearchProvider'
import Label from '../../../consts/labels'
import { searchKeyOff, searchKeyOn, strongText } from '../../../styles/util'

interface Props {
  index: number
  execute_progress: string[][]
}

export const QExcludeButton: FC<Props> = memo(({ index, execute_progress }) => {
  const { selectExcludeDays } = useSelectExcludeDaysContext()
  const questions = useAppSelector(selectQuestions)
  const getBgColor = (option?: number) => {
    if (selectExcludeDays) {
      if (option || option === 0) {
        return selectExcludeDays.includes(option) ? searchKeyOn : searchKeyOff
      } else {
        return selectExcludeDays.length === 0
          ? 'text-white bg-blue-600'
          : 'text-white bg-red-300'
      }
    } else {
      return 'text-white bg-blue-600'
    }
  }
  const count = () => {
    if (index < 7) {
      return execute_progress[index].length
    } else if (index === 7) {
      return execute_progress
        .slice(7, 14)
        .reduce((sum, count) => sum.concat(count)).length
    } else if (index === 8) {
      return execute_progress
        .slice(14)
        .reduce((sum, count) => sum.concat(count)).length
    } else if (index === 9) {
      return (
        questions.filter((question) => question && !question.is_old).length -
        execute_progress.reduce((sum, count) => sum.concat(count)).length
      )
    } else {
      return 0
    }
  }
  const onClick = (option?: number) => {}
  return (
    <button
      className={
        `place-items-center flex justify-between rounded-full w-full` +
        ` h-8 p-2 bg-blue-500 ${strongText} ${getBgColor(index)}`
      }
      onClick={() => onClick(index)}
    >
      <span className="flex pl-2">{Label.excludeLabels[index]}</span>
      <span
        className={
          `flex items-center justify-center rounded-full` +
          ` bg-blue-500 h-6 w-6 text-xs font-bold text-gray-300`
        }
      >
        {count()}
      </span>
    </button>
  )
})
