import { memo, useContext, VFC } from "react";
import { SearchContext } from "./SearchContext";

interface Props {
  index: number
  mistake_progress: string[][]
}
const conditionLetters = ["今日", "昨日", "2日前", "3日前", "4日前", "5日前", "6日前", "1週間以上前", "2週間以上前", "3週間以上前"]

export const QMistakeButton: VFC<Props> = memo(({ index, mistake_progress }) => {
  const { selectMistakeDays } = useContext(SearchContext)
  const getBgColor = (option?: number) => {
    if (selectMistakeDays) {
      if (option || option === 0) {
        return selectMistakeDays.includes(option)
          ? 'text-white bg-blue-600'
          : 'text-gray-500 bg-gray-300'
      } else {
        return selectMistakeDays.length === 0
          ? 'text-white bg-blue-600'
          : 'text-white bg-red-300'
      }
    } else {
      return 'text-white bg-blue-600'
    }
  }
  const count = () => {
    if (index < 7) {
      return mistake_progress[index].length
    } else if (index === 7) {
      return mistake_progress.slice(7, 14).reduce((sum, count) => sum.concat(count)).length
    } else if (index === 8) {
      return mistake_progress.slice(14, 21).reduce((sum, count) => sum.concat(count)).length
    } else if (index === 9) {
      return mistake_progress.slice(21).reduce((sum, count) => sum.concat(count)).length
    } else {
      return 0
    }
  }
  const onClick = (option?: number) => {
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
        {count()}
      </span>
    </button>
  )
})