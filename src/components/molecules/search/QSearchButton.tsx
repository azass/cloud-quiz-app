import { FC, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  useSelectOptionsContext,
  useSelectScoringsContext,
} from './SearchProvider'
import {
  resetShowContent,
  selectExam,
  selectExamTags,
  selectScArgs,
  setScArgs,
} from '../../../slices/editSlice'
import { iconBase, strongText } from '../../../styles/util'
import { DocumentRemoveIcon } from '@heroicons/react/outline'

interface Props {
  selectSearchTags: string[]
  setSelectSearchTags: any
}

export const QSearchButton: FC<Props> = memo(
  ({ selectSearchTags, setSelectSearchTags }) => {
    const dispatch = useAppDispatch()
    const { selectOptions } = useSelectOptionsContext()
    const { selectScorings } = useSelectScoringsContext()
    const tags = useAppSelector(selectExamTags)
    const exam = useAppSelector(selectExam)
    const scArgs = useAppSelector(selectScArgs)
    const search = () => {
      const argTags = tags
        .filter((tag) => selectSearchTags.includes(tag.tag_name))
        .map((tag) => tag.tag_no.toString())
      const newScArgs = {
        ...scArgs,
        exam_ids: [exam.exam_id],
        category_ids: argTags,
        other_options: selectOptions,
        scorings: selectScorings,
      }
      dispatch(setScArgs(newScArgs))
      dispatch(resetShowContent())
    }
    return (
      <div className="flex flex-row">
        <span
          className={
            `rounded-full border w-48 py-1 my-1 mr-1 px-3` +
            ` bg-blue-600 ${strongText} cursor-pointer`
          }
          onClick={() => search()}
        >
          SEARCH
        </span>
        {selectSearchTags.length > 0 && (
          <DocumentRemoveIcon
            className={`w-8 h-8 ml-8 ${iconBase}`}
            onClick={() => setSelectSearchTags([])}
          />
        )}
      </div>
    )
  }
)
