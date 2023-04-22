import { memo, FC } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectQuestions } from '../../../slices/editSlice'
import { Question } from '../../../types/types'
import { useSelectOptionsContext } from './SearchProvider'
import Label from '../../../consts/labels'
import { searchKeyOff, searchKeyOn, strongText } from '../../../styles/util'
interface Props {
  index: number
}
export const QConditionButton: FC<Props> = memo(({ index }) => {
  const questions = useAppSelector(selectQuestions)
  const { selectOptions, setSelectOptions } = useSelectOptionsContext()
  const getBgColor = (option?: number) => {
    if (selectOptions) {
      if (option || option === 0) {
        return selectOptions.includes(option) ? searchKeyOn : searchKeyOff
      } else {
        return selectOptions.length === 0
          ? 'text-white bg-blue-600'
          : 'text-white bg-red-300'
      }
    } else {
      return searchKeyOff
    }
  }
  const onClick = (option?: number) => {
    if (selectOptions) {
      if (option || option === 0) {
        if (selectOptions.includes(option)) {
          setSelectOptions(
            selectOptions.filter((selectOption) => selectOption !== option)
          )
        } else {
          setSelectOptions([...selectOptions, option])
        }
      } else {
        if (selectOptions.length > 0) {
          setSelectOptions([])
        }
      }
    }
  }
  const filter = (question: Question) => {
    if (index === 0) {
      return question.is_bug
    } else if (index === 1) {
      return question.is_difficult
    } else if (index === 2) {
      return question.is_weak
    } else if (index === 3) {
      return question.is_mandatory
    } else if (index === 4) {
      return question.is_bug
    }
  }
  return (
    <button
      className={
        `place-items-center flex justify-between rounded-full w-full h-8 p-2 bg-blue-500 ${strongText} ` +
        getBgColor(index)
      }
      onClick={() => onClick(index)}
    >
      <span className="flex pl-2">{Label.conditionLabels[index]}</span>
      <span
        className={`flex items-center justify-center rounded-full bg-blue-500 h-6 w-6 text-xs font-bold text-gray-300`}
      >
        {questions.filter((question) => filter(question)).length}
      </span>
    </button>
  )
})
