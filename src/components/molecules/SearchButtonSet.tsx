import {
  DocumentRemoveIcon,
  DocumentSearchIcon,
} from '@heroicons/react/outline'
import { memo, useState, VFC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
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
export const SearchButtonSet: VFC<Props> = memo(
  ({ examId, selectTags, setSelectSearchTags }) => {
    const scArgs = useAppSelector(selectScArgs)
    const tags = useAppSelector(selectExamTags)
    const dispatch = useAppDispatch()
    const [selectOptions, setSelectOptions] = useState<number[]>([])
    const getBgColor = (option?: number) => {
      if (option || option === 0) {
        return selectOptions.includes(option)
          ? 'text-white bg-blue-600'
          : 'text-gray-500 bg-gray-300'
      } else {
        return selectOptions.length === 0
          ? 'text-white bg-blue-600'
          : 'text-gray-500 bg-gray-300'
      }
    }
    const noSelectBgcolor = () => {
      if (selectTags.length > 0) {
        return ' bg-blue-500'
      } else {
        return ''
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
    const search = () => {
      const argTags = tags
        .filter((tag) => selectTags.includes(tag.tag_name))
        .map((tag) => tag.tag_no.toString())
      dispatch(
        setScArgs({
          ...scArgs,
          category_ids: argTags,
          other_options: selectOptions,
        })
      )
      dispatch(setTab(tabs[1]))
    }
    return (
      <>
        <div className="flex flex-row">
          <Link to={`/editor/${examId}/`}>
            <DocumentSearchIcon
              className="w-8 h-8 text-gray-200 cursor-pointer"
              onClick={() => search()}
            />
          </Link>
          {selectTags.length > 0 && (
            <DocumentRemoveIcon
              className={'w-8 h-8 ml-8 text-gray-200 cursor-pointer'}
              onClick={() => setSelectSearchTags([])}
            />
          )}
        </div>
        <div className="flex justify-around pt-6 pr-4">
          <div className="w-1/6 px-2">
            <button
              className={
                'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
                getBgColor()
              }
              onClick={() => onClick()}
            >
              すべて
            </button>
          </div>
          <div className="w-1/6 px-2">
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
          <div className="w-1/6 px-2">
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
          <div className="w-1/6 px-2">
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
          <div className="w-1/6 px-2">
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
          <div className="w-1/6 px-2">
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
      </>
    )
  }
)
