import { memo, FC } from 'react'
import { useSearch } from '../../../hooks/useSearch'
import { TagSelectPanel } from '../tag/TagSelectPanel'
import { QSearchParamButtons } from './QSearchParamButtons'
import { SearchProvider } from './SearchProvider'
import { QSearchButton } from './QSearchButton'

export const QSearchPanel: FC = memo(() => {
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } =
    useSearch()

  // const { status, data } = useQueryExamTags(exam)
  // if (status === 'loading')
  //   return <div className="pl-8 pt-8">{'Loading...'}</div>
  // if (status === 'error') return <div>{'Error'}</div>
  // if (data) {
  //   dispatch(setExamTags(data))
  // }
  return (
    <SearchProvider>
      <div className="overflow-y-auto h-screen">
        <div className="px-6">
          <QSearchParamButtons />
        </div>
        {/* <div className="px-6">
        <QSProgressButtonSet exam_id={exam.exam_id} />
      </div> */}
        <div className="pt-6 pl-8">
          <QSearchButton
            selectSearchTags={selectSearchTags}
            setSelectSearchTags={setSelectSearchTags}
          />
        </div>
        <div className="-mt-8">
          <TagSelectPanel
            useExamTags={true}
            selectTags={selectSearchTags}
            onClickTag={onClickSearchTag}
            setSelectSearchTags={setSelectSearchTags}
          />
        </div>
      </div>
    </SearchProvider>
  )
})
