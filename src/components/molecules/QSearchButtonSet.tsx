import {
  DocumentRemoveIcon,
  DocumentSearchIcon,
} from '@heroicons/react/outline'
import { memo, useState, VFC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  resetEditedContent,
  selectExamTags,
  selectScArgs,
  setScArgs,
  setTab,
  tabs,
} from '../../slices/editSlice'
interface Props {
  examId: string
  selectTags: string[]
  setSelectSearchTags: any
}
export const QSearchButtonSet: VFC<Props> = memo(
  ({ examId, selectTags, setSelectSearchTags }) => {
    const scArgs = useAppSelector(selectScArgs)
    const tags = useAppSelector(selectExamTags)
    const dispatch = useAppDispatch()
    const [selectOptions, setSelectOptions] = useState<number[]>([])
    const [selectScorings, setSelectScorings] = useState<number[]>([])
    const getBgColor = (option?: number) => {
      if (option || option === 0) {
        return selectOptions.includes(option)
          ? 'text-white bg-blue-600'
          : 'text-gray-500 bg-gray-300'
      } else {
        return selectOptions.length === 0
          ? 'text-white bg-blue-600'
          : 'text-white bg-red-300'
      }
    }
    const onClick0 = () => {
      if (selectOptions.includes(-2)) {
        setSelectOptions([])
      } else {
        setSelectOptions([...selectOptions, -2])
      }
    }
    const onClick = (option?: number) => {
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
    const onClickScoring = (option?: number) => {
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
    const getBgColor2 = (option?: number) => {
      if (option || option === 0) {
        return selectScorings.includes(option)
          ? 'text-white bg-blue-600'
          : 'text-gray-500 bg-gray-300'
      } else {
        return selectScorings.length === 0
          ? 'text-white bg-blue-600'
          : 'text-white bg-red-300'
      }
    }

    const search = () => {
      console.log('QSearchButtonSet search() execute')
      const argTags = tags
        .filter((tag) => selectTags.includes(tag.tag_name))
        .map((tag) => tag.tag_no.toString())
      const newScArgs = {
        ...scArgs,
        exam_ids: [examId],
        category_ids: argTags,
        other_options: selectOptions,
        scorings: selectScorings,
      }
      dispatch(setScArgs(newScArgs))
      dispatch(setTab(tabs[1]))
      dispatch(resetEditedContent())
      console.log("editedContent: 'QuizList'")
    }
    return (
      <>
        <div className="flex flex-row">
          <Link to={`/editor/${examId}/`}>
            <DocumentSearchIcon
              className="w-6 h-6 text-gray-200 cursor-pointer"
              onClick={() => search()}
            />
          </Link>
          {selectTags.length > 0 && (
            <DocumentRemoveIcon
              className={'w-6 h-6 ml-8 text-gray-200 cursor-pointer'}
              onClick={() => setSelectSearchTags([])}
            />
          )}
        </div>
        <div className="flex justify-around pt-6 pr-4">
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor()
              }
              onClick={() => onClick0()}
            >
              {selectOptions.includes(-2) ? '対象外' : 'すべて'}
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor(0)
              }
              onClick={() => onClick(0)}
            >
              復習
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor(1)
              }
              onClick={() => onClick(1)}
            >
              難問
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor(2)
              }
              onClick={() => onClick(2)}
            >
              苦手
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor(3)
              }
              onClick={() => onClick(3)}
            >
              必須
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor(4)
              }
              onClick={() => onClick(4)}
            >
              バグ
            </button>
          </div>
        </div>
        <div className="flex justify-around pt-6 pr-4">
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(0)
              }
              onClick={() => onClickScoring(0)}
            >
              無印
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(1)
              }
              onClick={() => onClickScoring(1)}
            >
              知識不足
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(2)
              }
              onClick={() => onClickScoring(2)}
            >
              理解不足
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(3)
              }
              onClick={() => onClickScoring(3)}
            >
              読解不足
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(4)
              }
              onClick={() => onClickScoring(4)}
            >
              うろ覚え
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(5)
              }
              onClick={() => onClickScoring(5)}
            >
              注意不足
            </button>
          </div>
        </div>
        <div className="flex justify-start pt-2 pr-4">
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(6)
              }
              onClick={() => onClickScoring(6)}
            >
              山勘
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(7)
              }
              onClick={() => onClickScoring(7)}
            >
              ぼんやり
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(8)
              }
              onClick={() => onClickScoring(8)}
            >
              残像
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(9)
              }
              onClick={() => onClickScoring(9)}
            >
              ほぼ実力
            </button>
          </div>
          <div className="w-1/6 px-1">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor2(10)
              }
              onClick={() => onClickScoring(10)}
            >
              完璧
            </button>
          </div>
        </div>
      </>
    )
  }
)
