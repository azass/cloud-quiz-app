import { VFC, memo } from 'react'
import { useAppDispatch } from '../../app/hooks'
import {
  setEditedContent,
  setEditContext,
} from '../../slices/editSlice'
import { QTerms } from '../atoms/QTerms'
import { Question, TagTerms, voidTag } from '../../types/types'
import { PlusCircleIcon } from '@heroicons/react/solid'
import log from 'loglevel'

interface Props {
  question: Question
  keywords: TagTerms
  withAdd: boolean
}
export const QKeywords: VFC<Props> = memo(({ question, keywords, withAdd }) => {
  log.setLevel("info")
  log.debug("QTags start")
  const dispatch = useAppDispatch()
  const addTag = () => {
    dispatch(setEditedContent('TagSelect'))
    dispatch(
      setEditContext({
        quest_id: question.quest_id,
        keywordsJson: JSON.stringify(keywords),
        chosenTag: voidTag,
        forQuestion: true
        // tag_terms: keywords
      })
    )
  }
  return (
    <>
      <div className="flex flex-wrap justify-start " title="QKeywords">
        {Object.keys(keywords).map((tagName, index) => (
          <>
            <span
              key={question.quest_id + '_' + index++}
              className="rounded-full border my-1 mr-1 py-1 px-3 bg-pink-600 text-white font-bold"
            >
              {tagName}
            </span>
            {keywords[tagName].length > 0 && <QTerms terms={keywords[tagName]} />}
          </>
        ))}
      </div>
      <PlusCircleIcon
        onClick={() => addTag()}
        className={`h-5 w-5 my-4 text-pink-500 cursor-pointer ${withAdd ? '' : 'hidden'
          }`}
      />
    </>
  )
})
