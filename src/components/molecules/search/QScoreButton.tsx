import { memo, FC } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectQuestions } from '../../../slices/editSlice'
import { useSelectScoringsContext } from './SearchProvider'
interface Props {
  index: number
}
const scoreLetters = [
  '無印',
  '知識不足',
  '理解不足',
  'うろ覚え',
  '読解不足',
  '注意不足',
  '山勘',
  '残像',
  'ぼんやり',
  'ほぼ実力',
  '実力',
]

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
        return selectScorings.includes(option)
          ? 'text-white bg-blue-600'
          : 'text-gray-500 bg-gray-300'
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
        'place-items-center flex justify-between rounded-full w-full h-8 p-2 bg-blue-500 text-white font-bold ' +
        getBgColor(index)
      }
      onClick={() => onClick(index)}
    >
      <span className="flex pl-2">{scoreLetters[index]}</span>
      <span className="rounded-full bg-blue-500 h-6 w-6 text-xs flex items-center justify-center font-bold text-gray-300">
        {questions.filter((question) => question.scoring === index).length}
      </span>
    </button>
  )
})
