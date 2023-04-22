/* eslint-disable no-useless-concat */
import { PencilAltIcon } from '@heroicons/react/outline'
import { FC, memo, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import { SaveButton } from '../../../atoms/SaveButton'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useQuestionContext } from './QuestionProvider'
import { iconBase, strongText } from '../../../../styles/util'

export const QLeaningProfiles: FC = memo(() => {
  const { question } = useQuestionContext()
  const [lastQuestId, setLastQuestId] = useState(question.quest_id)
  const [isEasy, setIsEasy] = useState(question.is_easy || false)
  const [isDifficult, setIsDifficult] = useState(question.is_difficult || false)
  const [isWeak, setIsWeak] = useState(question.is_weak || false)
  const [isMandatory, setIsMandatory] = useState(question.is_mandatory || false)
  const [learningNote, setLearningNote] = useState(question.learning_note)
  const [editting, setEditting] = useState(false)
  const { putQuestion } = useMutateQuestion()
  const [registerToggle, setRegisterToggle] = useState<boolean>(false)

  if (lastQuestId !== question.quest_id) {
    setLastQuestId(question.quest_id)
    setIsEasy(question.more_study || false)
    setIsDifficult(question.is_difficult || false)
    setIsWeak(question.is_weak || false)
    setIsMandatory(question.is_mandatory || false)
    setRegisterToggle(false)
  }
  const onClickSave = () => {
    putQuestion(
      {
        quest_id: question.quest_id,
        learning_note: learningNote,
      },
      question
    )
    setRegisterToggle(false)
  }
  return (
    <>
      <div className="flex items-center py-4" title="QLeaningProfiles">
        <button
          type="button"
          className={`flex-shrink-0 border p-1 ${strongText} ${
            isEasy && ` bg-purple-600`
          }`}
          onClick={() => {
            setIsEasy(!isEasy)
            question.is_easy = !isEasy
            putQuestion(
              {
                quest_id: question.quest_id,
                is_easy: question.is_easy,
              },
              question
            )
          }}
        >
          <span className="px-8">簡単</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border p-1 ${strongText}` +
            `${isDifficult && ` bg-red-600`}`
          }
          onClick={() => {
            setIsDifficult(!isDifficult)
            question.is_difficult = !isDifficult
            putQuestion(
              {
                quest_id: question.quest_id,
                is_difficult: question.is_difficult,
              },
              question
            )
          }}
        >
          <span className="px-8">難問</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border p-1 ${strongText}` +
            `${isWeak && ` bg-pink-500`}`
          }
          onClick={() => {
            setIsWeak(!isWeak)
            question.is_weak = !isWeak
            putQuestion(
              {
                quest_id: question.quest_id,
                is_weak: question.is_weak,
              },
              question
            )
          }}
        >
          <span className="px-8">弱点</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border-t border-r border-b p-1 ${strongText}` +
            `${isMandatory && ` bg-green-600`}`
          }
          onClick={() => {
            setIsMandatory(!isMandatory)
            question.is_mandatory = !isMandatory
            putQuestion(
              {
                quest_id: question.quest_id,
                is_mandatory: question.is_mandatory,
              },
              question
            )
          }}
        >
          <span className="px-8">必須</span>
        </button>
        <PencilAltIcon
          className={`h-5 w-5 ml-8 ${iconBase}`}
          onClick={() => setEditting(!editting)}
        />
      </div>
      {editting ? (
        <>
          <ReactTextareaAutosize
            value={learningNote || ''}
            className="px-4 py-3 mt-1 w-full block rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black text-base"
            onChange={(e) => {
              setLearningNote(e.target.value)
              question.learning_note = e.target.value
              setRegisterToggle(true)
            }}
          ></ReactTextareaAutosize>
          <div className="flex justify-center mx-auto">
            {registerToggle && <SaveButton onClick={onClickSave} />}
          </div>
        </>
      ) : (
        <ReactMarkdown
          className={`text-base w-full text-white whitespace-pre-wrap`}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          children={learningNote || ''}
        />
      )}
    </>
  )
})
