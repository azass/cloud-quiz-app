import { DocumentRemoveIcon } from '@heroicons/react/outline'
import { memo, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useQueryExamTags } from '../../../hooks/useQueryExamTags'
import { useSearch } from '../../../hooks/useSearch'
import {
  resetShowContent,
  selectExam,
  selectExamTags,
  selectScArgs,
  setExamTags,
  setScArgs,
} from '../../../slices/editSlice'
import { TagSelectPanel } from '../../organisms/TagSelectPanel'
import { QSProgressButtonSet } from './QProgressButtonSet'
import { QSearchButtonSet } from './QSearchButtonSet'
import {
  useSelectOptionsContext,
  useSelectScoringsContext,
} from './SearchProvider'
import { iconBase, strongText } from '../../../styles/util'

export const QSearchQuery: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { selectOptions } = useSelectOptionsContext()
  const { selectScorings } = useSelectScoringsContext()
  const scArgs = useAppSelector(selectScArgs)
  const tags = useAppSelector(selectExamTags)
  const exam = useAppSelector(selectExam)
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } =
    useSearch()

  const { status, data } = useQueryExamTags(exam)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  if (data) {
    dispatch(setExamTags(data))
  }
  const search = () => {
    console.log('QSearchButtonSet search() execute')
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
    console.log("editedContent: 'QuizList'")
  }
  return (
    <>
      <div className="px-6">
        <QSearchButtonSet />
      </div>
      <div className="px-6">
        <QSProgressButtonSet exam_id={exam.exam_id} />
      </div>
      <div className="flex flex-row pt-6 pl-8">
        <span
          className={`rounded-full border w-48 py-1 my-1 mr-1 px-3 bg-blue-600 ${strongText} cursor-pointer`}
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
      <div className="-mt-8">
        <TagSelectPanel
          useExamTags={true}
          selectTags={selectSearchTags}
          onClickTag={onClickSearchTag}
          setSelectSearchTags={setSelectSearchTags}
        />
      </div>
    </>
  )
})
