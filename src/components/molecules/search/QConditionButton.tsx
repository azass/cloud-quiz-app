import { memo, useContext, VFC } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectQuestions } from "../../../slices/editSlice";
import { Question } from "../../../types/types";
import { SearchContext } from "./SearchContext";
interface Props {
  index: number
}
const conditionLetters = ["復習", "難問", "苦手", "必須", "バグ"]
export const QConditionButton: VFC<Props> = memo(({ index }) => {
  const questions = useAppSelector(selectQuestions)
  const { selectOptions, setSelectOptions } = useContext(SearchContext)
  const getBgColor = (option?: number) => {
    if (selectOptions) {
      if (option || option === 0) {
        return selectOptions.includes(option)
          ? 'text-white bg-blue-600'
          : 'text-gray-500 bg-gray-300'
      } else {
        return selectOptions.length === 0
          ? 'text-white bg-blue-600'
          : 'text-white bg-red-300'
      }
    } else {
      return 'text-gray-500 bg-gray-300'
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
        'place-items-center flex justify-between rounded-full w-full h-8 p-2 bg-blue-500 text-white font-bold ' +
        getBgColor(index)
      }
      onClick={() => onClick(index)}
    >
      <span className="flex pl-2">{conditionLetters[index]}</span>
      <span className="rounded-full bg-blue-500 h-6 w-6 text-xs flex items-center justify-center font-bold text-gray-300">
        {questions.filter((question) => filter(question)).length}
      </span>
    </button>
  )
})
