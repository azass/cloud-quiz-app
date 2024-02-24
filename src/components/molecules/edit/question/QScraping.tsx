import { FC, memo, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useScraping } from '../../../../hooks/useScraping'
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PencilIcon,
  CheckIcon,
  ChatIcon,
} from '@heroicons/react/solid'
import { AcademicCapIcon } from '@heroicons/react/outline'
import { Question } from '../../../../types/types'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import { QComments } from './QComments'
import { useQuestionContext } from './QuestionProvider'
import { iconBase, iconShine, strongText } from '../../../../styles/util'
import Colors from '../../../../consts/colors'

export const QScraping: FC = memo(() => {
  const { question, setQuestion } = useQuestionContext()
  const { showFlg, setShowFlg, isLoading, onChange, onClick, onClick2 } =
    useScraping(question, setQuestion)
  const { updateQuestion } = useMutateQuestion()
  const [editFlg, setEditFlg] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [scan, setScan] = useState('all')

  const onChangeText = (text: string) => {
    const newQuestion = { ...question, original_url: text }
    setQuestion(newQuestion)
  }

  const putOriginalUrl = () => {
    const reqData: Question = {
      quest_id: question.quest_id,
      original_url: question.original_url,
    }
    updateQuestion(reqData)
  }
  const onClickCheck = () => {
    putOriginalUrl()
    setEditFlg(false)
  }
  return (
    <div
      className="w-full border-blue-500 border-opacity-100"
      title="QScraping"
    >
      {showFlg ? (
        <>
          <div className="flex flex-row-reverse">
            <ChevronDoubleDownIcon
              className={`h-3 w-3 ${iconShine}`}
              fill="currentColor"
              onClick={() => setShowFlg(false)}
            />
          </div>
          <textarea
            className="form-textarea mt-1 block w-full border-blue-500 border-opacity-100"
            rows={13}
            onChange={(e) => onChange(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className={
              `flex justify-center mx-auto px-4 py-2 mt-4` +
              ` rounded-lg bg-blue-500 ${strongText}`
            }
            onClick={() => onClick(question.quest_id)}
          >
            取り込み
          </button>
        </>
      ) : (
        <div className="flex flex-row-reverse">
          <ChevronDoubleUpIcon
            className={`flex flex-row-reverse h-3 w-3 ${iconShine}`}
            fill="currentColor"
            onClick={() => setShowFlg(true)}
          />
        </div>
      )}
      <div className="flex justify-start items-center mt-2">
        <span className={`pr-2 font-bold text-xs ${Colors.shining}`}>URL</span>
        {!editFlg ? (
          <>
            <PencilIcon
              className={`h-6 w-6 pl-2 ${iconBase}`}
              fill="currentColor"
              onClick={() => setEditFlg(true)}
            />
            <AcademicCapIcon
              className={`h-4 w-4 ml-4 ${iconBase}`}
              fill="none"
              stroke="currentColor"
              onClick={() => onClick2(true, scan)}
            />
            <button
              type="button"
              className={`rounded-full flex-shrink-0 border px-2 py-0 ${strongText} text-[9px] mx-2`}
              onClick={() => setScan(scan === 'all' ? 'comments' : 'all')}
            >
              <span>{scan === 'all' ? 'すべて' : 'コメント'}</span>
            </button>
            <ChatIcon
              className={`h-4 w-4 ml-4 ${iconBase}`}
              stroke="currentColor"
              onClick={() => setShowComment(!showComment)}
            />
          </>
        ) : (
          <>
            <CheckIcon
              className={`h-4 w-4 my-1 ${iconBase}`}
              fill="currentColor"
              onClick={() => onClickCheck()}
            />
            <AcademicCapIcon
              className={`h-4 w-4 ml-4 my-1 ${iconBase}`}
              fill="none"
              stroke="currentColor"
              onClick={() => {
                onClickCheck()
                onClick2(true, 'all')
              }}
            />
          </>
        )}
      </div>
      {(editFlg || !('original_url' in question)) && (
        <TextareaAutosize
          className="px-6 py-1 mt-1 w-full border-gray-300 text-xs"
          onChange={(e) => onChangeText(e.target.value)}
          value={question.original_url}
        />
      )}
      {isLoading && (
        <div className="flex justify-center">
          <div
            className={
              `animate-spin h-10 w-10 rounded-full` +
              ` border-4 border-blue-500 border-t-transparent`
            }
          ></div>
        </div>
      )}
      <div className="py-2 underline text-blue-700 text-base text-[12px]">
        <a href={question.original_url} target="_blank">
          {question.original_url}
        </a>
      </div>
      {showComment && (
        <div>
          <div className="py-4">コメント</div>
          <QComments />
        </div>
      )}
    </div>
  )
})
