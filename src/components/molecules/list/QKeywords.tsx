import { VFC, memo } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import {
  setEditedContent,
  setEditContext,
} from '../../../slices/editSlice'
import { QTerms } from '../../atoms/QTerms'
import { Question, voidTag } from '../../../types/types'
import { PlusCircleIcon } from '@heroicons/react/solid'
import log from 'loglevel'
import { useKeywords } from '../../../hooks/useKeywords'
import { useTags } from '../../../hooks/useTags'

interface Props {
  question: Question
  withAdd: boolean
}
export const QKeywords: VFC<Props> = memo(({ question, withAdd }) => {
  log.setLevel("info")
  log.debug("QTags start")
  const { getTagName } = useTags()
  const dispatch = useAppDispatch()
  const { getKeywordsJson } = useKeywords(question)
  const keywords = getKeywordsJson()
  const addTag = () => {
    dispatch(setEditedContent('TagSelect'))
    dispatch(
      setEditContext({
        quest_id: question.quest_id,
        keywordsJson: JSON.stringify(keywords),
        chosenTag: voidTag,
        forQuestion: true
      })
    )
  }
  return (
    <>
      <div className="flex flex-wrap justify-start " title="QKeywords">
        {Object.keys(keywords).map((key, index) => (
          <>
            <span
              key={question.quest_id + '_' + index++}
              className="flex items-center rounded-full border py-1 my-1 mr-1 px-3 bg-pink-600 text-white font-bold"
            >
              {getTagName(key)}
            </span>
            {keywords[key].length > 0 && <QTerms terms={keywords[key]} />}
          </>
        ))}
        {!withAdd && question.labels &&
          question.labels.map((label, index) => (
            <span className="flex items-center rounded-full border my-1 mr-1 py-1 px-3 bg-pink-300 text-white font-bold text-xs">{label}</span>
          ))
        }
        <PlusCircleIcon
          onClick={() => addTag()}
          className={`h-5 w-5 mt-2 ml-8 text-pink-500 cursor-pointer ${withAdd ? '' : 'hidden'}`}
        />
      </div>
    </>
  )
})
