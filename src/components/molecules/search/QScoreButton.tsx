import { memo, FC } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectQuestions } from '../../../slices/editSlice'
import { useSelectScoringsContext } from './SearchProvider'
import Label from '../../../consts/labels'
import { searchKeyOff, searchKeyOn, strongText } from '../../../styles/util'
interface Props {
  index: number
}
export const QScoreButton: FC<Props> = memo(({ index }) => {
  const questions = useAppSelector(selectQuestions)
  const { selectScorings, setSelectScorings } = useSelectScoringsContext()
  const onClick = (option?: number) => {
    if (selectScorings) {
      if (option || option === 0) {
        if (selectScorings.includes(option)) {
          setSelectScorings(
            selectScorings.filter((selectScoring) => selectScoring !== option)
          )
        } else {
          setSelectScorings([...selectScorings, option])
        }
      } else {
        if (selectScorings.length > 0) {
          setSelectScorings([])
        }
      }
    }
  }
  const getBgColor = (option?: number) => {
    if (selectScorings) {
      if (option || option === 0) {
        return selectScorings.includes(option) ? searchKeyOn : searchKeyOff
      } else {
        return selectScorings.length === 0
          ? 'text-white bg-blue-600'
          : 'text-white bg-red-300'
      }
    } else {
      return 'text-white bg-blue-600'
    }
  }
  return (
    <button
      className={
        `place-items-center flex justify-between rounded-full w-full` +
        ` h-8 p-2 bg-blue-500 ${strongText} ${getBgColor(index)}`
      }
      onClick={() => onClick(index)}
    >
      <span className="flex pl-2">{Label.scoreLetters[index]}</span>
      <span
        className={
          `flex items-center justify-center rounded-full` +
          ` bg-blue-500 h-6 w-6 text-xs font-bold text-gray-300`
        }
      >
        {questions.filter((question) => question.scoring === index).length}
      </span>
    </button>
  )
})
