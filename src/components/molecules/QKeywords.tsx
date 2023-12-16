import { FC, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  setShowContent,
  setEditContext,
  selectExam,
  setTab,
} from '../../slices/editSlice'
import { QTerms } from './edit/question/QTerms'
import { Question, voidTag } from '../../types/types'
import { CodeIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useKeywords } from '../../hooks/useKeywords'
import { useTags } from '../../hooks/useTags'
import { strongText } from '../../styles/util'
import { useAuto } from '../../hooks/useAuto'
import Label from '../../consts/labels'
import { ServiceTag } from '../atoms/ServiceTag'

interface Props {
  question: Question
  withAdd: boolean
}
export const QKeywords: FC<Props> = memo(({ question, withAdd }) => {
  const exam = useAppSelector(selectExam)
  const { suggestTags } = useAuto()
  const dispatch = useAppDispatch()
  const { getKeywordsJson } = useKeywords()
  const keywords = getKeywordsJson(question)
  const addTag = () => {
    dispatch(setTab(Label.tabs[2]))
    dispatch(setShowContent('questTagSelect'))
    dispatch(
      setEditContext({
        quest_id: question.quest_id,
        keywordsJson: JSON.stringify(keywords),
        chosenTag: voidTag,
        forQuestion: true,
      })
    )
  }
  const autoTag = () => {
    suggestTags(exam.provider, question.quest_id, question.tags || [], keywords)
  }
  return (
    <div className="flex flex-wrap justify-start " title="QKeywords">
      {Object.keys(keywords).map((key, index) => (
        <>
          <ServiceTag tagkey={key} question={question} />
          {keywords[key].length > 0 && <QTerms terms={keywords[key]} />}
        </>
      ))}
      {!withAdd ? (
        question.labels &&
        question.labels.map((label) => (
          <span
            className={
              `flex items-center rounded-full border` +
              ` my-1 mr-1 py-1 px-3 bg-pink-300 text-xs ${strongText}`
            }
          >
            {label}
          </span>
        ))
      ) : (
        <>
          <PlusCircleIcon
            onClick={() => addTag()}
            className={`h-5 w-5 mt-2 ml-8 text-pink-500 cursor-pointer`}
          />
          <CodeIcon
            onClick={() => autoTag()}
            className={`h-5 w-5 mt-2 ml-8 text-pink-500 cursor-pointer`}
          />
        </>
      )}
    </div>
  )
})
