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
  const [isIndefinite, setIsIndefinite] = useState(
    question.is_indefinite || false
  )
  const [priority, setPriority] = useState(question.priority || 2)
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
    setIsIndefinite(question.is_indefinite || false)
    setRegisterToggle(false)
  }

  const onEasy = () => {
    question.is_easy = !isEasy
    putQuestion(
      {
        quest_id: question.quest_id,
        is_easy: question.is_easy,
      },
      question
    )
    setIsEasy(!isEasy)
  }

  const onDifficult = () => {
    question.is_difficult = !isDifficult
    putQuestion(
      {
        quest_id: question.quest_id,
        is_difficult: question.is_difficult,
      },
      question
    )
    setIsDifficult(!isDifficult)
  }

  const onWeak = () => {
    question.is_weak = !isWeak
    putQuestion(
      {
        quest_id: question.quest_id,
        is_weak: question.is_weak,
      },
      question
    )
    setIsWeak(!isWeak)
  }

  const onIndefinite = () => {
    question.is_indefinite = !isIndefinite
    putQuestion(
      {
        quest_id: question.quest_id,
        is_indefinite: question.is_indefinite,
      },
      question
    )
    setIsIndefinite(!isIndefinite)
  }

  const onPriority = (value: number) => {
    question.priority = value
    putQuestion(
      {
        quest_id: question.quest_id,
        priority: question.priority,
      },
      question
    )
    setPriority(value)
  }
  return (
    <>
      <div className="flex items-center py-4" title="QLeaningProfiles">
        <button
          type="button"
          className={`flex-shrink-0 border p-1 ${strongText} ${
            isEasy && ` bg-purple-600`
          }`}
          onClick={() => onEasy()}
        >
          <span className="px-4">簡単</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border p-1 ${strongText} ` +
            `${isDifficult && ` bg-red-600`}`
          }
          onClick={() => onDifficult()}
        >
          <span className="px-4">難問</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border p-1 ${strongText} ` +
            `${isWeak && ` bg-pink-500`}`
          }
          onClick={() => onWeak()}
        >
          <span className="px-4">弱点</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border-t border-r border-b p-1` +
            ` ${strongText} ${isIndefinite && ` bg-yellow-500`}`
          }
          onClick={() => onIndefinite()}
        >
          <span className="px-4">不定</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border-t border-r border-b p-1` +
            ` ${strongText} ${priority == 0 && ` bg-green-600`}`
          }
          onClick={() => onPriority(0)}
        >
          <span className="px-3">捨て問</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border-t border-r border-b p-1` +
            ` ${strongText} ${priority == 1 && ` bg-green-600`}`
          }
          onClick={() => onPriority(1)}
        >
          <span className="px-3">後回し</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border-t border-r border-b p-1` +
            ` ${strongText} ${priority == 2 && ` bg-green-600`}`
          }
          onClick={() => onPriority(2)}
        >
          <span className="px-4">普通</span>
        </button>
        <button
          type="button"
          className={
            `flex-shrink-0 border-t border-r border-b p-1` +
            ` ${strongText} ${priority == 3 && ` bg-green-600`}`
          }
          onClick={() => onPriority(3)}
        >
          <span className="px-4">必須</span>
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
            className={
              `px-4 py-3 mt-1 w-full block rounded-md border border-gray-300` +
              ` focus:border-indigo-300 focus:ring focus:ring-indigo-200` +
              ` focus:ring-opacity-50 text-black text-base`
            }
            onChange={(e) => {
              setLearningNote(e.target.value)
              question.learning_note = e.target.value
              setRegisterToggle(true)
            }}
          ></ReactTextareaAutosize>
          <div className="flex justify-center mx-auto">
            {registerToggle && (
              <SaveButton
                onClick={() => {
                  putQuestion(
                    {
                      quest_id: question.quest_id,
                      learning_note: learningNote,
                    },
                    question
                  )
                  setRegisterToggle(false)
                }}
              />
            )}
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
