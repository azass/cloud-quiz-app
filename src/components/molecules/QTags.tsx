import { VFC, memo } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  setEditedContent,
  setEditContext,
  selectEditContext,
  setCallTermEdit,
} from '../../slices/editSlice'
import { QTerms } from '../atoms/QTerms'
import { Question, voidTag } from '../../types/types'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useTags } from '../../hooks/useTags'

interface Props {
  question: Question
  withAdd: boolean
}
export const QTags: VFC<Props> = memo(({ question, withAdd }) => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const { getTag } = useTags()
  const keywords =
    editContext.quest_id === question.quest_id
      ? editContext.keywordsJson === ''
        ? {}
        : JSON.parse(editContext.keywordsJson)
      : question.keywords

  const callTermEdit = (tagName: string) => {
    dispatch(setEditedContent('TermEdit'))
    dispatch(
      setEditContext({
        quest_id: question.quest_id,
        keywordsJson: JSON.stringify(keywords),
        chosenTag: getTag(tagName),
      })
    )
    dispatch(setCallTermEdit(true))
  }
  const addTag = () => {
    dispatch(setEditedContent('TagSelect'))
    dispatch(
      setEditContext({
        quest_id: question.quest_id,
        keywordsJson: JSON.stringify(keywords),
        chosenTag: voidTag,
      })
    )
  }
  return (
    <>
      <div className="flex flex-wrap justify-start ">
        {Object.keys(keywords).map((tagName, index) => (
          <>
            <span
              key={question.quest_id + '_' + index++}
              className="rounded-full border my-1 mr-1 py-1 px-3 bg-pink-600 text-white font-bold cursor-pointer"
              onClick={() => callTermEdit(tagName)}
            >
              {tagName}
            </span>
            <QTerms terms={keywords[tagName]} />
          </>
        ))}
      </div>
      <PlusCircleIcon
        onClick={() => addTag()}
        className={`h-5 w-5 my-4 text-pink-500 cursor-pointer ${
          withAdd ? '' : 'hidden'
        }`}
      />
    </>
  )
})
